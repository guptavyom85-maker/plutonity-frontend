// lib/api.ts
import axios from "axios";

// Your backend URL
const API_URL = "http://localhost:8000";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: automatically adds auth token to every request
// So you don't have to manually add it every time
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── AUTH ─────────────────────────────────────────────

export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  const response = await api.post("/auth/register", {
    email,
    password,
    username,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// ─── BACKTEST ─────────────────────────────────────────

export const submitBacktest = async (data: {
  strategy_name: string;
  code: string;
  ticker: string;
  start_date: string;
  end_date: string;
  initial_capital: number;
}) => {
  const response = await api.post("/backtest/submit", data);
  return response.data;
};

export const getBacktestStatus = async (resultId: string) => {
  const response = await api.get(`/backtest/status/${resultId}`);
  return response.data;
};

export const getBacktestResult = async (strategyId: string) => {
  const response = await api.get(`/backtest/result/${strategyId}`);
  return response.data;
};

// ─── LEADERBOARD ──────────────────────────────────────

export const getLeaderboard = async () => {
  const response = await api.get("/leaderboard/");
  return response.data;
};