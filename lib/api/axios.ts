// lib/api/axios.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
