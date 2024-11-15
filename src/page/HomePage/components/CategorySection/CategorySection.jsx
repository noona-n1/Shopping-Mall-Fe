import React, { useRef } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import ProductCard from "../ProductCard/ProductCard";
import './CategorySection.style.css';

const CategorySection = ({ categoryName, products }) => {
    const listRef = useRef(null);

    const handleScroll = (direction) => {
        const container = listRef.current;
        const scrollAmount = container.offsetWidth * 0.5;

        if (direction === 'left') {
            if (container.scrollLeft <= 0) {
                // 왼쪽 끝에 도달했을 때 맨 끝 이미지로 이동
                container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        } else {
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                // 오른쪽 끝에 도달했을 때 첫 번째 이미지로 이동
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="homepage-category-section">
            <div className="homepage-section-content">
                <div className="homepage-category-header">
                    <h2 className="homepage-category-title">{categoryName}</h2>
                    <a href="#" className="homepage-more-link">more ▶</a>
                </div>

                <div className="homepage-product-list-wrapper">
                    <button
                        className="category-nav-button category-prev-button"
                        onClick={() => handleScroll('left')}
                        aria-label="Previous products"
                    >
                        <IoChevronBack />
                    </button>

                    <div className="homepage-product-list" ref={listRef}>
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                discount={product.discount}
                            />
                        ))}
                    </div>

                    <button
                        className="category-nav-button category-next-button"
                        onClick={() => handleScroll('right')}
                        aria-label="Next products"
                    >
                        <IoChevronForward />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategorySection;