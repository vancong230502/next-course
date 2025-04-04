export interface User {
  id: string;
  email: string;
  fullName: string;
  picture?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResponse {
  user: User;
} 