import { Note } from '@/types/note';
import { nextServer } from './api';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  [key: string]: unknown;
}

export interface UserResponse {
  username?: string;
  email?: string;
  [key: string]: unknown;
}

export const login = async (
  credentials: AuthRequest
): Promise<AuthResponse> => {
  const response = await nextServer.post<AuthResponse>(
    '/auth/login',
    credentials
  );
  return response.data;
};

export const register = async (
  userData: AuthRequest
): Promise<AuthResponse> => {
  const response = await nextServer.post<AuthResponse>(
    '/auth/register',
    userData
  );
  return response.data;
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  search = '',
  tag = 'all',
}: {
  page?: number;
  search?: string;
  tag?: string;
} = {}): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page };

  if (search && search.trim() !== '') {
    params.search = search.trim();
  }
  if (tag && tag.toLowerCase() !== 'all') {
    params.tag = tag;
  }

  const response = await nextServer.get<FetchNotesResponse>(
    '/notes',
    { params }
  );
  return response.data;
};

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const response = await nextServer.post<Note>(
    '/notes',
    note
  );
  return response.data;
};

export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const response = await nextServer.get<Note>(
    `/notes/${id}`
  );
  return response.data;
};

export const deleteNote = async (
  id: string
): Promise<Note> => {
  const response = await nextServer.delete<Note>(
    `/notes/${id}`
  );
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession =
  async (): Promise<AuthResponse> => {
    const response =
      await nextServer.get<AuthResponse>('/auth/session');
    return response.data;
  };

export const getMe = async (): Promise<UserResponse> => {
  const response =
    await nextServer.get<UserResponse>('/users/me');
  return response.data;
};

export const updateMe = async (userData: {
  username: string;
}): Promise<UserResponse> => {
  const response = await nextServer.patch<UserResponse>(
    '/users/me',
    userData
  );
  return response.data;
};
