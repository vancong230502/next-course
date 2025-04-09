import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Định nghĩa kiểu User
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "USER";
  picture?: string;
}

export type Role = "ADMIN" | "USER" | null;

// Định nghĩa kiểu AuthState
interface AuthState {
  // State
  user: User | null;
  role: Role;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

// Tạo auth store với persist middleware
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // State mặc định
      user: null,
      role: null,
      isLoading: false,
      error: null,

      // Action login
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("http://127.0.0.1:8000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();
          console.log("dữ liệu là", data);
          if (!response.ok) {
            throw new Error(data.message || "Đăng nhập thất bại");
          }

          set({
            user: data,
            role: data.role,
            error: null,
          });
          return data;
        } catch (error: any) {
          set({ error: error.message || "Đăng nhập thất bại" });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Action register
      register: async (email: string, password: string, fullName: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("http://127.0.0.1:8000/auth/register", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, fullName }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Đăng ký thất bại");
          }

          set({
            user: data,
            role: data.role,

            error: null,
          });
          return data;
        } catch (error: any) {
          set({ error: error.message || "Đăng ký thất bại" });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Action logout
      logout: async () => {
        set({ isLoading: true });
        try {
          await fetch("http://127.0.0.1:8000/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            role: null,
            isLoading: false,

            error: null,
          });
        }
      },

      // Action kiểm tra trạng thái xác thực
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch("http://127.0.0.1:8000/auth/profile", {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const userData = await response.json();
            set({
              user: userData,
              role: userData.role,
              error: null,
            });
          } else {
            // Reset state nếu không có thông tin xác thực
            set({
              user: null,
              role: null,
              error: null,
            });
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          set({
            user: null,
            role: null,
            error: null,
          });
        } finally {
          set({ isLoading: false });
        }
      },
      // Đăng nhập với google
      loginWithGoogle: () => {
        window.location.href = "http://127.0.0.1:8000/auth/google";
      },
            
      // Action làm mới token
      refreshToken: async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/auth/refresh", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            // If refresh failed, logout user
            get().logout();
            return;
          }

          // If refresh successful, updated user data will be in cookies
          // Update state with user data if available in response
          const data = await response.json();
          if (data && data.id) {
            set({
              user: data,
              role: data.role,
              error: null,
            });
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          // Logout on refresh error
          get().logout();
        }
      },

      // Action xóa thông báo lỗi
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage", // tên storage key trong localStorage
      storage: createJSONStorage(() => localStorage), // sử dụng localStorage
      partialize: (state) => ({
        // chỉ lưu một số trường, không lưu trường isLoading và error
        user: state.user,
        role: state.role,
      }),
    }
  )
);
