import Link from 'next/link';
import css from './NoteList.module.css';
import type { Note } from '@/types/note';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
    onError: (error) => {
      console.error('Error during deletion:', error);
    },
  });
  console.log(notes);
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <Link
              href={`/notes/${note.id}`}
              className={css.detailsButton}
            >
              View details
            </Link>

            <button
              className={css.deleteButton}
              onClick={() => deleteMutation.mutate(note.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? 'Deleting...'
                : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
