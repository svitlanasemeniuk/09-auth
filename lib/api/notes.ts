import { api } from './axios';
import { Note } from '@/types/note';

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
  const params: Record<string, string | number> = {
    page,
  };

  if (search && search.trim() !== '') {
    params.search = search.trim();
  }

  if (tag && tag.toLowerCase() !== 'all') {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>(
    '/notes',
    { params }
  );
  return response.data;
};

export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};
