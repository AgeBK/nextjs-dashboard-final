import Link from 'next/link';
import styles from '@/app/_assets/css/CategoryNoResults.module.css';

const CategoryNoResults = ({ isManage }: { isManage: boolean }) => (
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

export default CategoryNoResults;
