import ManageSideNav from '../ui/manage/manage-sidenav';
import styles from '@/app/assets/css/manage/ManageLayout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <ManageSideNav />
      <main className={styles.main}>
        <div className={styles.main}>{children}</div>
      </main>
    </div>
  );
}
