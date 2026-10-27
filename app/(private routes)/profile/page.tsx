import { Metadata } from 'next';
import { getMe } from '../../../lib/api/serverApi';
import css from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description:
    'User profile page with personal information',
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main className={css.mainContainer}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link
            href="/profile/edit"
            className={css.editProfileButton}
          >
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          {user.avatar && (
            <Image
              src={user.avatar} // Без лапок! Беремо змінну
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username || 'Not set'}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
