// app/notes/filter/[...slug]/page.tsx
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/notes';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const filterTag = resolvedParams.slug[0] || 'all';

  const formattedTag =
    filterTag.charAt(0).toUpperCase() + filterTag.slice(1);

  const pageTitle = `Notes filtered by tag: ${formattedTag} | NoteHub`;

  const pageDescription = `View a list of notes filtrated by a category ${formattedTag}.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: 'https://notehub.com/',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub Filter - ${formattedTag}`,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;

  const currentTag = resolvedParams.slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', currentTag],
    queryFn: () =>
      fetchNotes({ page: 1, search: '', tag: currentTag }),
  });

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>
        Notes filtered by tag:{' '}
        <span style={{ textTransform: 'capitalize' }}>
          {currentTag}
        </span>
      </h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={currentTag} />
      </HydrationBoundary>
    </div>
  );
}
