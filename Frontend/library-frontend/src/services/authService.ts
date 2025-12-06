import axios from 'axios';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/Auth';

const API_BASE = "http://localhost:5013/api";
const TOKEN_KEY = 'authToken';
const USERNAME_KEY = 'username';

// Auth API calls
export const register = (data: RegisterRequest) => 
  axios.post<AuthResponse>(`${API_BASE}/Auth/register`, data);

export const login = (data: LoginRequest) => 
  axios.post<AuthResponse>(`${API_BASE}/Auth/login`, data);

// Token management
export const saveToken = (token: string, username: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USERNAME_KEY, username);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUsername = (): string | null => {
  return localStorage.getItem(USERNAME_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Logout function
export const logout = () => {
  removeToken();
};
