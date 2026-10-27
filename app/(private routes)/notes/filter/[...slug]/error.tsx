'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: 'red' }}>
        Oops, something went wrong...
      </h2>
      <button
        onClick={() => reset()}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        Try again!
      </button>
    </div>
  );
}
