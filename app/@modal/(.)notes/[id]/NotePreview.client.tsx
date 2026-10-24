'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '../../../../lib/api/notes';
import Modal from '../../../../components/Modal/Modal';
import Loader from '../../../../components/Loader/Loader';

export default function NotePreviewClient({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {isLoading && <Loader />}
      {isError && <p>Error note loading...</p>}

      {note && (
        <div style={{ padding: '20px' }}>
          <h2>{note.title}</h2>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '12px',
              marginBottom: '16px',
              fontSize: '14px',
              color: '#6c757d',
            }}
          >
            {note.tag && (
              <span
                style={{
                  backgroundColor: '#e9ecef',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontWeight: 500,
                  color: '#495057',
                }}
              >
                {note.tag}
              </span>
            )}

            {note.createdAt && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {new Date(
                  note.createdAt
                ).toLocaleDateString()}
              </span>
            )}
          </div>

          <p
            style={{ marginTop: '10px', lineHeight: '1.6' }}
          >
            {note.content}
          </p>
        </div>
      )}
    </Modal>
  );
}
