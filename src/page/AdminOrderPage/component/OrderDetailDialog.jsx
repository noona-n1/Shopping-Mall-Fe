import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateOrderStatus} from '../../../features/order/orderSlice';
import {Modal, Button, Form, Table} from 'react-bootstrap';
import './OrderDetailDialog.style.css';

const OrderDetailDialog = ({open, handleClose, order, handleStatusChange}) => {
  if (!order) return null; // 주문이 없으면 아무것도 렌더링하지 않음

  const dispatch = useDispatch();
  const [status, setStatus] = useState(order.status);

  const handleStatusSelect = (e) => {
    setStatus(e.target.value);
  };

  const handleSaveStatus = async () => {
    await dispatch(updateOrderStatus({orderId: order._id, newStatus: status}));
    await handleStatusChange(order._id, status);
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose} centered className='large-modal'>
      <Modal.Header closeButton>
        <Modal.Title>주문 상세 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>주문 번호: {order.orderNum}</h5>
        <p>주문 날짜: {new Date(order.createdAt).toLocaleString()}</p>
        <p>고객 이름: {`${order.contact.lastName} ${order.contact.firstName}`}</p>
        <p>연락처: {order.contact.contact}</p>
        <p>주소: {`(${order.shipto.zip}) ${order.shipto.address} ${order.shipto.city} `}</p>

        {/* 상태 변경 드롭다운 추가 */}
        <Form.Group controlId='orderStatus'>
          <Form.Label>주문 상태</Form.Label>
          <Form.Control as='select' value={status} onChange={handleStatusSelect}>
            <option value='preparing'>preparing</option>
            <option value='shipping'>shipping</option>
            <option value='delivered'>delivered</option>
            <option value='cancelled'>cancelled</option>
          </Form.Control>
        </Form.Group>

        <br />
        <p>주문내역</p>
        <div className='overflow-x'>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.length > 0 &&
                order.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.productId.name}</td>
                    <td>{item.productId.realPrice.toLocaleString()}</td>
                    <td>{item.qty}</td>
                    <td>{(item.productId.realPrice * item.qty).toLocaleString()}</td>
                  </tr>
                ))}
              <tr>
                <td colSpan={4}>총계:</td>
                <td>{order.totalPrice.toLocaleString()} 원</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          닫기
        </Button>
        <Button variant='primary' onClick={handleSaveStatus}>
          상태 저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailDialog;
