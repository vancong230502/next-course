import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

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
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  clearUserData: () => void;
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
          console.log("Attempting login with:", { email });
          const { data } = await api.post('/auth/login', { email, password });
          console.log("Login response:", data);
          
          // Kiểm tra xem data có phải là một User object không
          if (data && typeof data === 'object' && 'id' in data && 'email' in data && 'role' in data) {
            set({
              user: data,
              role: data.role,
              error: null,
            });
          } else {
            console.error("Invalid response format:", data);
            set({ error: "Invalid response format from server" });
            throw new Error("Invalid response format from server");
          }
        } catch (error: any) {
          console.error("Login error:", error);
          const errorMessage = error.response?.data?.message || "Invalid email or password";
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Action register
      register: async (email: string, password: string, fullName: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/auth/register', { 
            email, 
            password, 
            fullName 
          });
          
          // Kiểm tra xem data có phải là một User object không
          if (data && typeof data === 'object' && 'id' in data && 'email' in data && 'role' in data) {
            set({
              user: data,
              role: data.role,
              error: null,
            });
          } else {
            set({ error: "Invalid response format from server" });
            throw new Error("Invalid response format from server");
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || "Registration failed";
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Action logout
      logout: async () => {
        // Đặt trạng thái loading để tránh nhiều request
        if (get().isLoading) return;
        
        set({ isLoading: true });
        
        try {
          // Xóa thông tin người dùng trước khi gọi API logout
          // để tránh các request không cần thiết
          set({
            user: null,
            role: null,
            error: null,
          });
          
          // Gọi API logout
          await api.post('/auth/logout');
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Action kiểm tra trạng thái xác thực
      checkAuth: async () => {
        // Nếu đang loading, không gọi API
        if (get().isLoading) return;
        
        set({ isLoading: true });
        try {
          const { data } = await api.get('/auth/profile');
          // Kiểm tra xem data có phải là một User object không
          if (data && typeof data === 'object' && 'id' in data && 'email' in data && 'role' in data) {
            set({
              user: data,
              role: data.role,
              error: null,
            });
          } else {
            throw new Error("Invalid response format from server");
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
        // Sử dụng window.open thay vì window.location.href
        window.open('/auth/google', '_blank');
      },

      // Action xóa thông báo lỗi
      clearError: () => set({ error: null }),
      
      // Action xóa thông tin người dùng
      clearUserData: () => set({
        user: null,
        role: null,
        error: null,
      }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        role: state.role,
      }),
    }
  )
);
