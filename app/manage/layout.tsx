import ManageSideNav from '../ui/manage/manage-sidenav';
import styles from '@/app/assets/css/manage/ManageLayout.module.css';

// manage folder seperate from the default routes
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <ManageSideNav />
      <main>{children}</main>
    </div>
  );
}
