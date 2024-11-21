import {useState, useEffect} from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import './ProductDetailPage.style.css';
import {useDispatch, useSelector} from 'react-redux';
import {clearProductDetail, fetchProductDetail} from '../../features/product/productSlice';
import {addToCart} from '../../features/cart/cartSlice';

const ProductDetailPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {productDetail, loading, error} = useSelector((state) => state.products);
  const {user} = useSelector((state) => state.user);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [size, setSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProductDetail(id));

    return () => {
      dispatch(clearProductDetail());
    };
  }, [id, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러 처리
  if (error) {
    return <div>Error: {error}</div>;
  }

  // 데이터가 없는 경우 처리
  if (!productDetail) {
    return <div>Product not found or loading failed.</div>;
  }
  const handleOptionSelect = (option) => {
    const exists = selectedOptions.find((item) => item.option === option);

    if (exists) {
      alert('이미 추가된 상품입니다. 주문 수량을 조정해주세요.');
      setIsOptionOpen(false);

      return;
    }
    setSizeError(false);
    setSelectedOptions((prev) => [...prev, {option, quantity: 1}]);
    console.log(selectedOptions);
    setIsOptionOpen(false);
  };

  const handleQuantityChange = (index, value) => {
    setSelectedOptions((prev) => prev.map((item, i) => (i === index ? {...item, quantity: Math.max(1, value)} : item)));
  };

  const handleRemoveOption = (index) => {
    setSelectedOptions((prev) => prev.filter((_, i) => i !== index));
  };
  const handleBuyNow = () => {
    if (selectedOptions.length === 0) {
      setSizeError(true);
      return;
    }

    const orderItems = selectedOptions.map((option) => ({
      productId: productDetail, // 상품 ID
      size: option.option, // 선택된 옵션
      qty: option.quantity, // 수량
      price: productDetail.salePrice || productDetail.price // 가격
    }));

    const totalPrice = orderItems.reduce((sum, item) => sum + item.qty * item.price, 0);

    navigate('/payment', {state: {items: orderItems, totalPrice}});
  };

  const addItemToCart = () => {
    if (selectedOptions.length === 0) {
      setSizeError(true);
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    // 선택된 옵션 배열 생성
    const cartItems = selectedOptions.map((option) => ({
      productId: id, // 상품 ID
      size: option.option, // 선택된 옵션
      qty: option.quantity // 수량
    }));

    console.log('요청 정보 (cartItems):', {cartItems});
    console.log('Array 여부 확인:', Array.isArray(cartItems));

    // Redux Thunk 호출: cartItems 배열 전송
    dispatch(addToCart({cartItems}))
      .unwrap()
      .then(() => {
        alert('선택된 옵션들이 장바구니에 추가되었습니다.');
      })
      .catch((error) => {
        console.error('장바구니 추가 실패:', error);
        alert('장바구니 추가 중 문제가 발생했습니다.');
      });
  };

  return (
    <div className='product-detail-page'>
      <div className='product-detail-page__left'>
        <div className='product-detail-page__main-image'>
          <img src={productDetail.image} alt={productDetail.name} />
        </div>
      </div>
      <div className='product-detail-page__right'>
        <div className='product-detail-page__header'>
          <h1 className='product-detail-page__brand'>{productDetail.brand}</h1>
          <div className='product-detail-page__name'>{productDetail.name}</div>
        </div>

        <div className='product-detail-page__price'>
          {productDetail.price && (
            <div className={`product-detail-page__original-price ${productDetail.salePrice ? 'line-through' : ''}`}>
              {productDetail.price.toLocaleString()}원
            </div>
          )}

          {productDetail.salePrice && (
            <div className='product-detail-page__sale-price'>
              <span className='discount-rate'>{productDetail.saleRate}%</span>
              <span className='price'>{productDetail.salePrice.toLocaleString()}원</span>
            </div>
          )}
        </div>
        <div className='product-detail-page__benefits'>
          <div className='product-detail-page__benefit-item'>
            <span className='label'>신규회원</span>
            <span className='value'>신규가입 시 20% 쿠폰</span>
          </div>
          <div className='product-detail-page__benefit-item'>
            <span className='label'>추가혜택</span>
            <div className='value'>
              <div>Toss Pay 2000원 적립</div>
              <div className='sub-text'>토스포인트 적립 혜택</div>
            </div>
          </div>
        </div>

        <div className='product-detail-page__options'>
          <div className='product-detail-page__option-item'>
            <button
              className={`product-detail-page__option-button ${sizeError ? 'error' : ''}`}
              onClick={() => setIsOptionOpen(!isOptionOpen)}>
              옵션을 선택해주세요
              <span className='product-detail-page__arrow-down'>▼</span>
            </button>

            {isOptionOpen && (
              <div className='product-detail-page__option-dropdown'>
                {Object.entries(productDetail.stock).map(([option, quantity]) => (
                  <div
                    key={option}
                    className='product-detail-page__option-choice'
                    onClick={() => handleOptionSelect(option)}>
                    {option.trim()} (재고: {quantity})
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {selectedOptions.map((selected, index) => (
          <div key={index} className='product-detail-page__selected-option'>
            <span>
              {productDetail.name} / {selected.option}
            </span>
            <div className='product-detail-page__quantity'>
              <input
                type='number'
                value={selected.quantity}
                min='1'
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
              />
              <span>{(productDetail.salePrice || productDetail.price) * selected.quantity}원</span>
              <button className='product-detail-page__remove-option' onClick={() => handleRemoveOption(index)}>
                ✖
              </button>
            </div>
          </div>
        ))}

        <div className='product-detail-page__buttons'>
          <button className='product-detail-page__buy-now' onClick={handleBuyNow}>
            바로 구매
          </button>
          <button className='product-detail-page__add-cart' onClick={addItemToCart}>
            장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
