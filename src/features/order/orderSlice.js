import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';
import {getCartQty} from '../cart/cartSlice';

// 비동기 주문 생성 액션
export const createOrder = createAsyncThunk('order/createOrder', async (orderData, {rejectWithValue, dispatch}) => {
  try {
    const response = await api.post('/order', orderData);
    dispatch(getCartQty());

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const getOrderList = createAsyncThunk('order/getOrderList', async (query, {rejectWithValue}) => {
  try {
    const response = await api.get('/order/admin', {params: {...query}});
    return {
      orders: response.data.orders,
      totalPageNum: response.data.totalPageNum,
      totalCount: response.data.totalCount
    };
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const updateOrderStatus = createAsyncThunk(
  'order/updateStatus',
  async ({orderId, status}, {rejectWithValue}) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}`, {status});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    orders: [],
    totalPageNum: 0,
    totalCount: 0,
    status: 'idle',
    error: null
  },
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.orders = [];
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
        state.order = action.payload.orderNum;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getOrderList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload.orders;
        state.totalPageNum = action.payload.totalPageNum;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order));
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const {resetOrderState} = orderSlice.actions;

export default orderSlice.reducer;
