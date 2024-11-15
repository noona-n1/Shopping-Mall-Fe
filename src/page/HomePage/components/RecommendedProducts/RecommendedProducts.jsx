import React, { useRef, useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import ProductCard from "../ProductCard/ProductCard";
import './RecommendedProducts.style.css';

const RecommendedProducts = ({ products }) => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleScroll = (direction) => {
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
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // 스크롤 속도 조절
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className="recommended-products-section">
            <h2 className="recommended-products-title">ITEMS FOR YOU</h2>
            <p className="recommended-products-subtitle">당신을 위한 추천상품</p>

            <div className="recommended-products-container">
                <button
                    className="recommended-nav-button recommended-prev-button"
                    onClick={() => handleScroll('left')}
                    aria-label="이전 상품"
                >
                    <IoChevronBack />
                </button>

                <div
                    className="recommended-products-list"
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {products.map((product) => (
                        <div key={product.id} className="recommended-product-item">
                            <ProductCard
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                discount={product.discount}
                            />
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
        </section>
    );
};

export default RecommendedProducts;
