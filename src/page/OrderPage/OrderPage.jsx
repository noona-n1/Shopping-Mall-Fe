import {useEffect, useState} from 'react';
import './OrderPage.style.css';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrder} from '../../features/order/orderSlice';

const OrderPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const dispatch = useDispatch();
  const {orderList, loading, error} = useSelector((state) => state.order);

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
    updateDateRange(period);
  };

  const updateDateRange = (period) => {
    const today = new Date();
    let startDate, endDate;

    switch (period) {
      case 'all':
        startDate = new Date('2008-01-01');
        endDate = today;
        break;
      case '1month':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        endDate = today;
        break;
      case '2month':
        startDate = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
        endDate = today;
        break;
      case '3month':
        startDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
        endDate = today;
        break;
      default:
        startDate = null;
        endDate = null;
    }
    const filterOrders = () => {
      if (!startDate || !endDate) {
        setFilteredOrders(orderList); // 날짜 선택 안 된 경우 전체 데이터 표시
        return;
      }

      const filtered = orderList.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startDate && orderDate <= endDate;
      });

      setFilteredOrders(filtered);
    };
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    dispatch(fetchOrder()); // 주문 데이터 가져오기
  }, [dispatch]);

  //   useEffect(() => {
  //     if (orderList.length > 0) {
  //       filterOrders(); // 데이터가 변경될 때 필터링
  //     }
  //   }, [orderList, startDate, endDate]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <div className='order-history-wrapper'>
      <h1 className='order-history-title'>주문/배송 조회</h1>

      <div className='order-history-header'>
        <button
          className={`order-history-filter-button ${selectedPeriod === 'all' ? 'active' : ''}`}
          onClick={() => handlePeriodClick('all')}>
          전체
        </button>
        <button
          className={`order-history-filter-button ${selectedPeriod === '1month' ? 'active' : ''}`}
          onClick={() => handlePeriodClick('1month')}>
          1개월
        </button>
        <button
          className={`order-history-filter-button ${selectedPeriod === '2month' ? 'active' : ''}`}
          onClick={() => handlePeriodClick('2month')}>
          2개월
        </button>
        <button
          className={`order-history-filter-button ${selectedPeriod === '3month' ? 'active' : ''}`}
          onClick={() => handlePeriodClick('3month')}>
          3개월
        </button>
        <input
          type='date'
          className='order-history-date-input'
          value={startDate ? startDate.toISOString().slice(0, 10) : ''}
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
        <span>~</span>
        <input
          type='date'
          className='order-history-date-input'
          value={endDate ? endDate.toISOString().slice(0, 10) : ''}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
        <button
          className='order-history-search-button'
          // onClick={filterOrders}
          //날짜조회 잠시 보류
        >
          조회
        </button>
      </div>

      <div className='order-history-table'>
        <div className='order-history-table-header'>
          <span>주문일</span>
          <span>주문번호</span>
          <span>상품정보</span>
          <span>수량</span>
          <span>상품금액</span>
          <span>진행상황</span>
        </div>

        {orderList.map((order) => {
          const totalAmount = order.items.reduce((sum, item) => sum + item.price * item.qty, 4000); // 총 상품금액 계산
          const itemDisplayName =
            order.items.length > 1
              ? `${order.items[0].product.name} 외 ${order.items.length - 1}개`
              : order.items[0].product.name; // 상품 이름 처리

          return (
            <div key={order.orderNum} className='order-history-table-row'>
              {/* PC 뷰 */}
              <div className='pc-view'>
                <div className='order-history-order-date'>{new Date(order.createdAt).toLocaleDateString('ko-KR')}</div>
                <div className='order-history-order-number'>{order.orderNum}</div>
                <div className='order-history-product-info'>
                  <img
                    src={order.items[0].product.image || '/images/default-product.jpg'}
                    alt='Product'
                    className='order-history-product-image'
                  />
                  <div className='order-history-product-details'>
                    <p className='order-history-product-name'>{itemDisplayName}</p>
                  </div>
                </div>
                <div className='order-history-quantity'>{order.items.reduce((sum, item) => sum + item.qty, 0)}</div>
                <div className='order-history-price'>{totalAmount.toLocaleString()}원</div>
                <div className='order-history-order-status'>{order.status}</div>
              </div>

              {/* 모바일 뷰 */}
              <div className='mobile-view'>
                <div className='order-history-order-header'>
                  <div className='order-history-order-date'>
                    {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                  </div>
                  <div className='order-history-order-number'>{order.orderNum}</div>
                </div>

                <div className='order-history-product-container'>
                  <img
                    src={order.items[0].product.image || '/images/default-product.jpg'}
                    alt='Product'
                    className='order-history-product-image'
                  />
                  <div className='order-history-product-details'>
                    <p className='order-history-product-name'>{itemDisplayName}</p>
                    <div className='order-history-price-quantity'>
                      <span className='order-history-quantity'>
                        총 수량: {order.items.reduce((sum, item) => sum + item.qty, 0)}개
                      </span>
                      <span className='order-history-price'>{totalAmount.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>

                <div className='order-history-status-review'>
                  <div className='order-history-order-status'>{order.status}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
