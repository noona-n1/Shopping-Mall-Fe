import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {IoHeartOutline, IoHeart} from 'react-icons/io5';
import './ProductCard.style.css';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLike, toggleLikeOptimistic} from '../../../features/like/likeSlice';

const ProductCard = ({id, image, title, salePrice, originalPrice, discountRate}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {likes} = useSelector((state) => state.like);

  const isLiked = likes.some((like) => like.productId === id || like.productId?._id === id);
  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 프론트엔드 상태를 즉시 반영
    dispatch(toggleLikeOptimistic(id));

    // 서버 요청
    dispatch(toggleLike(id)).catch((error) => {
      console.error('좋아요 토글 실패:', error);
      // 실패 시 상태를 복구하기 위해 다시 토글
      dispatch(toggleLikeOptimistic(id));
    });
  };
  const handleCardClick = () => {
    if (id) {
      navigate(`/product/${id}`);
    } else {
      alert('상품 정보를 찾을 수 없습니다.');
      console.error('Product ID is missing. Cannot navigate to the product detail page.');
    }
  };

  return (
    <div className='homepage-product-card' onClick={handleCardClick}>
      <div className='homepage-product-image-wrapper'>
        <div className='homepage-product-image-container'>
          <img src={image} alt={title} className='homepage-product-image' />
          <button
            className='homepage-product-like-button'
            onClick={handleLikeClick}
            aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}>
            {isLiked ? <IoHeart className='like-icon like-icon-filled' /> : <IoHeartOutline className='like-icon' />}
          </button>
        </div>
      </div>
      <div className='homepage-product-info'>
        <h3 className='homepage-product-title'>{title}</h3>
        <div className='homepage-product-price'>
          <span className='homepage-current-price'>{salePrice ? salePrice.toLocaleString() : '0'}원</span>
          {originalPrice && (
            <div className='homepage-price-discount'>
              <span className='homepage-original-price'>{originalPrice.toLocaleString()}원</span>
              <span className='homepage-discount'>-{discountRate ? discountRate : 0}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
