'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../../../lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe } from '../../../lib/api/clientApi';
import css from './page.module.css';

export default function SignUpPage() {
  const router = useRouter();

  const { setUser } = useAuthStore();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await register({ email, password });
      const userData = await getMe();
      setUser(userData);
      router.push('/profile');
    } catch {
      setError(
        'Error during registration. Please, try again...'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
          >
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
