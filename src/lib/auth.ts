import { LoginDto, RegisterDto, AuthResponse } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function login(data: LoginDto): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Đăng nhập thất bại");
  }

  return response.json();
}

export async function register(data: RegisterDto): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Đăng ký thất bại");
  }

  return response.json();
}

export async function loginWithGoogle(): Promise<void> {
  window.location.href = `${API_URL}/auth/google`;
}

export async function refreshToken(): Promise<{ accessToken: string }> {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Làm mới token thất bại");
  }

  return response.json();
}

export async function logout(): Promise<void> {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: 'include',
    });
  } finally {
    // Chỉ xóa user data
    localStorage.removeItem("user");
  }
}

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