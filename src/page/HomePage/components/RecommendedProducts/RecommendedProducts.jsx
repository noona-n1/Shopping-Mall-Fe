import React, { useRef, useState, useEffect } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import ProductCard from "../ProductCard/ProductCard";
import './RecommendedProducts.style.css';

const RecommendedProducts = ({ products }) => {
    const scrollRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const getItemsPerPage = () => {
        if (windowWidth <= 768) {
            return 4; // 모바일에서는 4개씩 (2x2)
        } else if (windowWidth <= 1200) {
            return 6; // 태블릿에서는 6개씩 (3x2)
        }
        return products.length; // PC에서는 전체 상품 표시
    };

    // 전체 페이지 수 계산
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(products.length / itemsPerPage);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScroll = (direction) => {
        if (windowWidth > 1200) {
            // PC 버전에서는 기존 슬라이드 방식
            const container = scrollRef.current;
            const scrollAmount = container.offsetWidth * 0.5;

            if (direction === 'left') {
                container.scrollLeft <= 0
                    ? container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
                    : container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                container.scrollLeft + container.clientWidth >= container.scrollWidth
                    ? container.scrollTo({ left: 0, behavior: 'smooth' })
                    : container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        } else {
            // 1200px 이하에서는 페이지 단위로 이동
            if (direction === 'left') {
                setCurrentPage(prev =>
                    prev === 0 ? totalPages - 1 : prev - 1
                );
            } else {
                setCurrentPage(prev =>
                    prev === totalPages - 1 ? 0 : prev + 1
                );
            }
        }
    };

    // 현재 표시할 상품들
    const displayedProducts = windowWidth > 1200
        ? products
        : products.slice(
            currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage
        );

    return (
        <section className="recommended-products-section">
            <h2 className="recommended-products-title">ITEMS FOR YOU</h2>
            <p className="recommended-products-subtitle">당신을 위한 추천상품</p>

            <div className="recommended-products-wrapper">

                <div className="recommended-products-container">
                    <button
                        className="recommended-nav-button recommended-prev-button"
                        onClick={() => handleScroll('left')}
                        aria-label="이전 상품"
                    >
                        <IoChevronBack />
                    </button>

                    <div className="recommended-products-list" ref={scrollRef}>
                        {displayedProducts.map((product) => (
                            <div key={product.id} className="recommended-product-item">
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>

                    <button
                        className="recommended-nav-button recommended-next-button"
                        onClick={() => handleScroll('right')}
                        aria-label="다음 상품"
                    >
                        <IoChevronForward />
                    </button>
                </div>

                {/* 1200px 이하일 때만 페이지 인디케이터 표시 */}
                {windowWidth <= 1200 && (
                    <div className="recommended-page-indicator">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                className={`page-dot ${currentPage === index ? 'active' : ''}`}
                                onClick={() => setCurrentPage(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecommendedProducts;
