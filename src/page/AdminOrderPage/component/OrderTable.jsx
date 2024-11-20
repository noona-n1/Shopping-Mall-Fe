import React from 'react';

const OrderTable = ({header, data, openEditForm}) => {
  return (
    <table className='order-table'>
      <thead>
        <tr>
          {header.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((order, index) => (
          <tr key={order._id} onClick={() => openEditForm(order)}>
            <td>{index + 1}</td>
            <td>{order.orderNum}</td>
            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            <td>{order.user}</td>
            <td>{order.items.length} items</td> {/* 주문 항목 수 */}
            <td>{order.address}</td>
            <td>{order.totalPrice.toLocaleString()} 원</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
