import SideNav from '@/app/ui/manage/sidenav';
import styles from '@/app/_assets/css/manage/ManageLayout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <SideNav />
      <main className={styles.main}>
        <div className={styles.main}>{children}</div>
      </main>
    </div>
  );
}
