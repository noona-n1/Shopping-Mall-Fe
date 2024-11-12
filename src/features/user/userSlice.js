import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';

export const loginWithEmail = createAsyncThunk(
  'user/loginWithEmail'

  //async ({ email, password }, thunkAPI) => {}
);
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
  }
});

export default userSlice.reducer;
