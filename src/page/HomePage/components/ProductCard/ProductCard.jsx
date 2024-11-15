import React, { useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import './ProductCard.style.css';

const ProductCard = ({ image, title, price, originalPrice, discount }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = (e) => {
        e.preventDefault(); // 이미지 클릭 이벤트와 분리
        setIsLiked(!isLiked);
    };

    return (
        <div className="homepage-product-card">
            <div className="homepage-product-image-container">
                <img src={image} alt={title} className="homepage-product-image" />
                <button
                    className="homepage-product-like-button"
                    onClick={handleLikeClick}
                    aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
                >
                    {isLiked ? (
                        <IoHeart className="like-icon like-icon-filled" />
                    ) : (
                        <IoHeartOutline className="like-icon" />
                    )}
                </button>
            </div>
            <div className="homepage-product-info">
                <h3 className="homepage-product-title">{title}</h3>
                <p className="homepage-product-price">
                    <span className="homepage-current-price">{price.toLocaleString()}원</span>
                    {originalPrice && (
                        <>
                            <span className="homepage-original-price">{originalPrice.toLocaleString()}원</span>
                            <span className="homepage-discount">-{discount}%</span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;