import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import './OrderDetailDialog.style.css';

const OrderDetailDialog = ({open, handleClose, order, handleStatusChange}) => {
  // 기본 주문 데이터 설정
  const defaultOrder = {
    orderNum: 'N/A',
    createdAt: new Date().toISOString(),
    user: 'N/A',
    address: 'N/A',
    totalPrice: 0,
    items: []
  };

  const currentOrder = order || defaultOrder; // 주문 데이터가 없으면 기본 데이터 사용
  const [status, setStatus] = useState(currentOrder.status || 'preparing');

  const handleStatusSelect = (e) => {
    setStatus(e.target.value);
  };

  const handleSaveStatus = () => {
    console.log('주문 ID:', currentOrder._id);
    console.log('새로운 상태:', status);
    handleStatusChange(currentOrder._id, status);
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>주문 상세 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>주문 번호: {currentOrder.orderNum}</h5>
        <p>주문 날짜: {new Date(currentOrder.createdAt).toLocaleString()}</p>
        <p>고객 이름: {currentOrder.user}</p>
        <p>주소: {currentOrder.address}</p>
        <p>총 가격: {currentOrder.totalPrice.toLocaleString()} 원</p>

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
          {currentOrder.items.length > 0 ? (
            currentOrder.items.map((item) => (
              <li key={item.id}>
                {item.name} - 수량: {item.quantity}
              </li>
            ))
          ) : (
            <li>주문 항목이 없습니다.</li> // 항목이 없을 경우 메시지 표시
          )}
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
