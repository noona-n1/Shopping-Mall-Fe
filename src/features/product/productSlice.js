import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';

// 상품 목록 가져오기 비동기 Thunk
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params, {rejectWithValue}) => {
  try {
    const response = await api.get('/product', {params});
    console.log(response.data);
    return response.data; // API에서 받은 상품 데이터
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchProductDetail = createAsyncThunk(`product/fetchProductDetail`, async (id, {rejectWithValue}) => {
  try {
    const response = await api.get(`/product/${id}`);

    return response.data.product;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateProduct = createAsyncThunk(`product/updateProduct`, async (product, {rejectWithValue}) => {
  try {
    const response = await api.put(`/product/${product.id}`, product);
    return response.data.product;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteProduct = createAsyncThunk(`product/deleteProduct`, async (id, {rejectWithValue, dispatch}) => {
  try {
    const response = await api.delete(`/product/${id}`);
    dispatch(fetchProducts({page: 1, limit: 5}));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productDetail: null,
    loading: false,
    error: null,
    totalPageNum: 1,
    totalCount: 0
  },
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
    clearProductDetail: (state) => {
      state.productDetail = null; // 상세 정보 초기화
    },
    clearError: (state) => {
      state.error = '';
      state.success = false;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPageNum = action.payload.totalPageNum;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productDetail = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
        console.log(Object.entries(state.productDetail.stock));
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Something went wrong.';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Something went wrong.';
      });
  }
});

export const {clearProducts, clearProductDetail, clearError, setSelectedProduct} = productSlice.actions;

export default productSlice.reducer;
