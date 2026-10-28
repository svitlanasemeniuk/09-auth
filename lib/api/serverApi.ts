import { nextServer } from './api';
import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';
import { Note } from '@/types/note';
import { User } from '@/types/user';

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes =
  async (): Promise<FetchNotesResponse> => {
    const response =
      await nextServer.get<FetchNotesResponse>('/notes', {
        headers: {
          Cookie: await getCookieHeader(),
        },
      });
    return response.data;
  };

export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const response = await nextServer.get<Note>(
    `/notes/${id}`,
    {
      headers: {
        Cookie: await getCookieHeader(),
      },
    }
  );
  return response.data;
};

export const checkSession =
  async (): Promise<AxiosResponse> => {
    const response = await nextServer.get('/auth/session', {
      headers: {
        Cookie: await getCookieHeader(),
      },
    });
    return response;
  };

export const refreshSession = async (): Promise<{
  accessToken?: string;
  refreshToken?: string;
}> => {
  const response = await nextServer.post<{
    accessToken?: string;
    refreshToken?: string;
  }>('/auth/refresh');
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });
  return response.data;
};
