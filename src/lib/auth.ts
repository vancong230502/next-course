import { LoginDto, RegisterDto, AuthResponse } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Hàm kiểm tra kết nối đến server
async function checkServerConnection() {
  try {
    console.log("nó là", API_URL);
    const response = await fetch(API_URL);
    return response.ok;
  } catch (error) {
    console.error('Server connection error:', error);
    return false;
  }
}

export const login = async (email: string, password: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Mock login logic
  if (password.length < 6) {
    throw new Error("Invalid credentials");
  }
  
  // Determine role based on email for demo
  const isAdmin = email.includes("admin");
  const role = isAdmin ? "admin" : "student";
  
  // Store user info in localStorage
  const userData = {
    email,
    role
  };
  
  localStorage.setItem("user", JSON.stringify(userData));
  return userData;
};

export const loginWithGoogle = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Mocked Google login data
  const userData = {
    email: "user@example.com",
    role: "student"
  };
  
  localStorage.setItem("user", JSON.stringify(userData));
  return userData;
};

export const register = async (email: string, password: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock register logic
  if (password.length < 6) {
    throw new Error("Password is too short");
  }
  
  // Always register as student
  const userData = {
    email,
    role: "student"
  };
  
  localStorage.setItem("user", JSON.stringify(userData));
  return userData;
};

export const logout = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Clear user data
  localStorage.removeItem("user");
};

// Thêm hàm để lấy thông tin user
export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json();
} 