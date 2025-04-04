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
  try {
    // Kiểm tra kết nối đến server
    const isServerAvailable = await checkServerConnection();
    if (!isServerAvailable) {
      throw new Error("Không thể kết nối đến server. Vui lòng kiểm tra lại server.");
    }

    console.log('API URL:', API_URL);
    console.log('Register data:', data);
    
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error response:', errorData);
      throw new Error(errorData.message || "Đăng ký thất bại");
    }

    const responseData = await response.json();
    console.log('Success response:', responseData);
    return responseData;
  } catch (error) {
    console.error('Register error:', error);
    if (error instanceof Error) {
      throw new Error(`Đăng ký thất bại: ${error.message}`);
    }
    throw new Error("Đăng ký thất bại: Không thể kết nối đến server");
  }
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