
import axiosInstance from "../../config/axiosConfig";

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/auth/login", { ...payload });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (payload) => {
  try {
    const { email, password, confirmPassword } = payload;
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const response = await axiosInstance.post("/auth/register", { email, password, confirmPassword });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post("/auth/refresh", { refreshToken });
    return response.data;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};
