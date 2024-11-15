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
      return rejectWithValue(error.response?.data?.message || '이메일과 비밀번호를 확인해주세요');
    }
  }
);

export const loginWithGoogle = createAsyncThunk('user/loginWithGoogle', async (token, {rejectWithValue}) => {
  try {
    const response = await api.post('auth/google', {token});
    sessionStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Google login failed');
  }
});

export const loginWithToken = createAsyncThunk('user/loginWithToken', async (_, {rejectWithValue}) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return rejectWithValue('No token found, skipping request');
  }

  try {
    const response = await api.get('/user/me');

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'An error occurred');
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
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(loginWithToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.loginError = null;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      });
  }
});
export const {clearErrors} = userSlice.actions;

export default userSlice.reducer;
