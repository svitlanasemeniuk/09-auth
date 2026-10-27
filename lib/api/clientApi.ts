import { Note } from '@/types/note';
import { api } from './api';

export interface AuthRequest {
  email: string;
  password: string;
}

export const login = async (credentials: AuthRequest) => {
  const response = await api.post(
    '/auth/login',
    credentials
  );
  return response.data;
};

export const register = async (userData: AuthRequest) => {
  const response = await api.post(
    '/auth/register',
    userData
  );
  return response.data;
};

export const fetchNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const createNote = async (noteData: Note) => {
  const response = await api.post('/notes', noteData);
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const checkSession = async () => {
  const response = await api.get('/auth/session');
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/user/me');
  return response.data;
};

export const updateMe = async (userData: {
  username: string;
}) => {
  const response = await api.patch('/users/me', userData); // Перевір, чи правильний ендпоінт (може бути /user/me)
  return response.data;
};
