'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/notes';
import css from './NoteDetails.client.module.css';

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({
  id,
}: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong...</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {note.createdAt
              ? new Date(
                  note.createdAt
                ).toLocaleDateString()
              : 'Created date'}
          </p>
        </div>
      </div>
    </main>
  );
}
