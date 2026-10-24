import css from '@/components/NotFound/NotFound.module.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description:
    'Page is not found. Return on the main page to continue working with NoteHub.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description:
      'Page is not found. Return on the main page to continue working with NoteHub.',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Page not found - NoteHub',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not
        exist...
      </p>
    </div>
  );
}
