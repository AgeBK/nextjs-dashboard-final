import Link from 'next/link';
import styles from '@/app/assets/css/category/CategoryNoResults.module.css';

export default function CategoryNoResults({ isManage }: { isManage: boolean }) {
  // displayed when zero results
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
