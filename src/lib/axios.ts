import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true, // Quan trọng để gửi cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Biến để theo dõi trạng thái refresh token
let isRefreshing = false;
// Hàng đợi các request đang chờ refresh token
let failedQueue: any[] = [];

// Hàm xử lý các request trong hàng đợi
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Danh sách các endpoint không cần refresh token
const publicEndpoints = [
  '/auth/login',
  '/auth/register',
  '/auth/google',
  '/auth/refresh',
  '/auth/logout'
];

// Hàm kiểm tra xem endpoint có cần refresh token không
const isPublicEndpoint = (url: string) => {
  return publicEndpoints.some(endpoint => url.includes(endpoint));
};

// Interceptor cho request
api.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có và không phải là public endpoint
    if (!isPublicEndpoint(config.url || '')) {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu là public endpoint hoặc đã thử refresh token, trả về lỗi ngay lập tức
    if (isPublicEndpoint(originalRequest.url || '') || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401) {
      if (isRefreshing) {
        // Nếu đang refresh token, thêm request vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Thử refresh token
        await api.post("/auth/refresh");
        // Xử lý các request trong hàng đợi
        processQueue(null);
        // Thử lại request ban đầu
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại
        processQueue(refreshError, null);
        // Xóa thông tin người dùng
        const authStore = useAuthStore.getState();
        authStore.clearUserData();
        // Chuyển hướng về trang login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api; 