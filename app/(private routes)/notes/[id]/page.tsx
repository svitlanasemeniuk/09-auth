import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  let pageTitle = 'Note Details | NoteHub';
  let pageDescription = 'Details about your note.';

  try {
    const note = await fetchNoteById(id);
    pageTitle = `${note.title} | NoteHub`;
    pageDescription = note.content
      ? `${note.content.substring(0, 120)}...`
      : pageDescription;
  } catch (error) {
    console.error(
      'Error downloading metadates of a note:',
      error
    );
  }

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Note Preview: ${pageTitle}`,
        },
      ],
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
