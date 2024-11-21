import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import './OrderDetailDialog.style.css';

const OrderDetailDialog = ({open, handleClose, order, handleStatusChange}) => {
  if (!order) return null; // 주문이 없으면 아무것도 렌더링하지 않음

  const [status, setStatus] = useState(order.status); // 상태 초기화

  const handleStatusSelect = (e) => {
    setStatus(e.target.value); // 상태 변경
  };

  const handleSaveStatus = () => {
    console.log('주문 ID:', order._id); // 주문 ID 확인
    console.log('새로운 상태:', status); // 상태 값 확인
    handleStatusChange(order._id, status); // 부모로 상태 변경 요청
    handleClose(); // 다이얼로그 닫기
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>주문 상세 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>주문 번호: {order.orderNum}</h5>
        <p>주문 날짜: {new Date(order.createdAt).toLocaleString()}</p>
        <p>고객 이름: {order.user}</p>
        <p>주소: {order.address}</p>
        <p>총 가격: {order.totalPrice.toLocaleString()} 원</p>

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

        <h6>주문 항목:</h6>
        <ul>
          {order.items.map((item) => (
            <li key={item.id}>
              {item.name} - 수량: {item.quantity}
            </li>
          ))}
        </ul>
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
