import axios from 'axios';
import type { Note } from '@/types/note';

const api = axios.create({
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

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  search = '',
  tag,
}: {
  page?: number;
  search?: string;
  tag?: string;
} = {}): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    search,
  };
  if (tag && tag.toLowerCase() !== 'all') {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>(
    '/notes',
    {
      params,
    }
  );
  return response.data;
};

export const createNote = async (
  newNote: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const response = await api.post<Note>('/notes', newNote);
  return response.data;
};

export const deleteNote = async (
  noteId: string
): Promise<Note> => {
  const response = await api.delete<Note>(
    `/notes/${noteId}`
  );
  return response.data;
};

export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};
