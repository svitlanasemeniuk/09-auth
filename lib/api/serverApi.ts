import { api } from './axios';
import { cookies } from 'next/headers';

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
};

export const fetchNotes = async () => {
  const response = await api.get('/notes', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
  return response.data;
};

export const checkSession = async () => {
  const response = await api.get('/auth/session', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/user/me', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
  return response.data;
};
