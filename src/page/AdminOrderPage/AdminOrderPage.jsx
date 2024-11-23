import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderList, updateOrderStatus} from '../../features/order/orderSlice';
import OrderDetailDialog from './component/OrderDetailDialog';
import './adminOrder.style.css';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const {orders, status, error, totalPageNum} = useSelector((state) => state.order); // totalPageNum 추가
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    limit: 10,
    ordernum: ''
  });

  useEffect(() => {
    if (error) {
      console.error(`주문 상태 업데이트 실패: ${error}`);
    }
  }, [error]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(true);

  const handlePageClick = ({selected}) => {
    setSearchQuery({...searchQuery, page: selected + 1});
  };

  useEffect(() => {
    dispatch(getOrderList(searchQuery));
  }, [dispatch, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery({...searchQuery, ordernum: e.target.value});
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery({...searchQuery, page: 1});
  };

  const openDetailDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const closeDetailDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({orderId, newStatus}));

      // 상태 변경 후 주문 목록을 새로 고침
      await dispatch(getOrderList(searchQuery));
    } catch (error) {
      console.error('주문 상태 업데이트 중 오류 발생:', error);
    }
  };

  return (
    <div className='admin-order-page admin-order-section'>
      <div className='admin-order-header'>
        <h1>주문 관리</h1>

        <form onSubmit={handleSearchSubmit}>
          <input
            type='text'
            placeholder='주문 번호로 검색'
            value={searchQuery.ordernum}
            onChange={handleSearchChange}
          />
          <button type='submit'>검색</button>
        </form>
      </div>
      {status === 'loading' && <p>로딩 중...</p>}
      {status === 'failed' && <p>오류 발생: {error}</p>}

      {status === 'succeeded' && (
        <table className='product-table admin-order-table'>
          <thead>
            <tr>
              <th>주문 번호</th>
              <th>고객 이름</th>
              <th>주문 날짜</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} onClick={() => openDetailDialog(order)}>
                <td>{order.orderNum}</td>
                <td>{`${order.contact.lastName} ${order.contact.firstName}`}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 페이지네이션 */}
      <ReactPaginate
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageNum}
        forcePage={searchQuery.page - 1}
        previousLabel='< previous'
        renderOnZeroPageCount={null}
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakLabel='...'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
        className='display-center list-style-none'
      />

      {/* 주문 상세 다이얼로그 */}
      {openDialog && (
        <OrderDetailDialog
          open={openDialog}
          handleClose={closeDetailDialog}
          order={selectedOrder}
          handleStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default AdminOrderPage;
