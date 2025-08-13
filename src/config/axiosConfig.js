import axios from "axios";
import store from "../store/reducers/store";
import { logout, refreshTokenThunk } from "../store/actions/authSlice";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token =  state.auth.accessToken || localStorage.getItem("accessToken");
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let pendingQueue = [];

const processQueue = (error, token = null) => {
  pendingQueue.forEach((resolve, reject) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  pendingQueue = [];
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error.response.status;
    if (status === 401 && !original._retry) {
      original._retry = true;

      if (!isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({
            resolve: (token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(original));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      try{
        const resultAction = await store.dispatch(refreshTokenThunk());
        if(refreshTokenThunk.fulfilled.match(resultAction)) {
          const newToken = resultAction.payload.jwt;
          processQueue(null, newToken);
          original.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(original);
        } else {
          processQueue(resultAction.error || new Error("Refresh failed"));
          store.dispatch(logout());
          return Promise.reject(error);
        }
      }catch (err) {
        processQueue(err || new Error("Refresh failed"))
        store.dispatch(logout())
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
