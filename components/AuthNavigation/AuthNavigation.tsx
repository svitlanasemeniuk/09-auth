'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '../../lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';
import css from './AuthNavigation.module.css';

export const AuthNavigation = () => {
  const router = useRouter();

  const { isAuthenticated, user, setIsAuthenticated } =
    useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated();
      router.push('/sign-in');
    } catch (error) {
      console.error('Error during logout...', error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>

            <button
              className={css.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};
