import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({email, name, password, navigate}, {rejectWithValue}) => {
    try {
      const response = await api.post('/user', {email, name, password});
      navigate('/login');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  'user/loginWithEmail',

  async ({email, password}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const response = await api.post('/auth/login', {email, password});
      sessionStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginWithToken = createAsyncThunk('user/loginWithToken', async (_, {rejectWithValue}) => {
  try {
    const response = await api.get('/user/me');
    return response.data;
  } catch (error) {
    rejectWithValue(error.error);
  }
});

export const logout = () => (dispatch) => {
  sessionStorage.removeItem('token');
  dispatch(userSlice.actions.logout());
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false
  },
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
    logout: (state) => {
      state.user = null;
      state.loginError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.loginError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(loginWithEmail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.loginError = null;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export default userSlice.reducer;
