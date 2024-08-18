import Link from 'next/link';
import styles from '@/app/assets/css/category/CategoryNoResults.module.css';

export default function CategoryNoResults({ isManage }: { isManage: boolean }) {
  return (
    <>
      Sorry, no results:
      <br />
      {!isManage && (
        <Link href="/" className={styles.link}>
          Back to homepage
        </Link>
      )}
    </>
  );
}
