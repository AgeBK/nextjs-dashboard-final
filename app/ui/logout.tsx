import { signOut } from '@/auth';
import { auth } from '../../auth';
import styles from '@/app/assets/css/Logout.module.css';

export default async function Logout() {
  const session = await auth();

  return (
    <span className={styles.logoutForm}>
      {session?.user && (
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className={styles.logout}>Sign Out</button>
        </form>
      )}
    </span>
  );
}
