import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, refreshToken } from "../../api/mainAPi/authApi";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await loginUser(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.refreshToken) throw new Error("No refresh token available");
      const data = await refreshToken(auth.refreshToken);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action){
      state.accessToken = action.payload.jwt;
      state.refreshToken = action.payload.refresh_token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
    clearAuthError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.accessToken = action.payload.jwt;
      state.refreshToken = action.payload.refresh_token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
      localStorage.setItem("user", JSON.stringify(state.user));
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // builder.addCase(refreshTokenThunk.pending, (state) => {
    // });

    builder.addCase(refreshTokenThunk.fulfilled, (state, action) => {
      state.accessToken = action.payload.jwt;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", state.accessToken);
    });

    builder.addCase(refreshTokenThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
})

export const { loginSuccess, logout, clearAuthError } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;