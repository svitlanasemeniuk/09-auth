'use client';

import { useState } from 'react';
import {
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';

import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './Notes.module.css';

export default function NotesClient({
  tag,
}: {
  tag: string;
}) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const [debouncedSearchQuery] = useDebounce(
    searchQuery,
    500
  );

  const {
    data: notesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', page, debouncedSearchQuery, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearchQuery,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  if (isLoading) return <p>Loading... </p>;
  if (isError || !notesData)
    return <p>Ooops! Error loading...</p>;

  return (
    <div className={css.container}>
      <div className={css.controls}>
        <SearchBox onChange={handleSearchChange} />

        {notesData.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={notesData.totalPages}
            onPageChange={setPage}
          />
        )}

        <Link
          href="/notes/action/create"
          className={css.button}
        >
          Create note +
        </Link>
      </div>

      {notesData.notes.length > 0 ? (
        <NoteList notes={notesData.notes} />
      ) : (
        <p>Notes were not found...</p>
      )}
    </div>
  );
}
