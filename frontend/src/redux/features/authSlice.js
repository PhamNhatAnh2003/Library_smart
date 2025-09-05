import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Thunk login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, {
        username,
        password,
      });

      if (res.data && res.data.user && res.data.token) {
        return res.data; // Trả về user + token
      } else {
        return rejectWithValue("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại!"
      );
    }
  }
);

// Thunk register
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password, full_name }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/users/create`, {
        username,
        password,
        full_name: full_name,
      });

      if (res.data && res.data.user) {
        return res.data;
      } else {
        return rejectWithValue("Đăng ký không thành công!");
      }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại!"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
