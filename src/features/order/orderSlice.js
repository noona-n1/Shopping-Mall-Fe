import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';
import {getCartQty} from '../cart/cartSlice';

// 비동기 주문 생성 액션
export const createOrder = createAsyncThunk('order/createOrder', async (orderData, {rejectWithValue, dispatch}) => {
  try {
    const response = await api.post('/order', orderData); // 주문 API 호출
    dispatch(getCartQty());

    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    // 실패 시 에러 메시지 반환
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const getOrderList = createAsyncThunk('order/getOrderList', async (query, {rejectWithValue}) => {
  try {
    const response = await api.get('/order/admin', {params: {...query}});
    return {
      orders: response.data.orders, // 주문 목록
      totalPageNum: response.data.totalPageNum, // 총 페이지 수
      totalCount: response.data.totalCount // 총 아이템 수
    };
  } catch (e) {
    return rejectWithValue(e.message); // 실패 시 에러 메시지 반환
  }
});

export const updateOrderStatus = createAsyncThunk(
  'order/updateStatus', // 액션 타입
  async ({orderId, status}, {rejectWithValue}) => {
    try {
      // 서버에 PUT 요청을 보내어 상태를 업데이트
      const response = await axios.put(`/api/orders/${orderId}`, {status});
      return response.data; // 응답 데이터 (상태: success)
    } catch (error) {
      return rejectWithValue(error.response.data); // 오류 처리
    }
  }
);

// 주문 관련 슬라이스
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null, // 주문 데이터
    orders: [], // 주문 목록 데이터 추가
    totalPageNum: 0, // 페이지네이션을 위한 총 페이지 수
    totalCount: 0, // 페이지네이션을 위한 총 아이템 수
    status: 'idle', // 상태: idle, loading, succeeded, failed
    error: null // 에러 메시지
  },
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.orders = []; // 주문 목록 초기화
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload.orderNum; // 주문 번호 저장
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // 에러 메시지 저장
      })
      .addCase(getOrderList.pending, (state) => {
        state.status = 'loading'; // 로딩 상태로 변경
        state.error = null; // 에러 초기화
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 성공 상태로 변경
        state.orders = action.payload.orders; // 주문 목록 저장
        state.totalPageNum = action.payload.totalPageNum; // 총 페이지 수 저장
        state.totalCount = action.payload.totalCount; // 총 아이템 수 저장
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.status = 'failed'; // 실패 상태로 변경
        state.error = action.payload; // 에러 메시지 저장
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = 'loading';
      })
      // 주문 상태 업데이트 성공 (fulfilled)
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedOrder = action.payload; // 서버에서 반환된 데이터 (상태: success)
        // 상태가 변경된 주문을 orders 배열에서 업데이트
        state.orders = state.orders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order));
      })
      // 주문 상태 업데이트 실패 (rejected)
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // 오류 메시지
      });
  }
});

export const {resetOrderState} = orderSlice.actions;

export default orderSlice.reducer;
