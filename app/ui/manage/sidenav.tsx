import Link from 'next/link';
import Img from '@/app/ui/image';
import Logout from '../logout';
import styles from '@/app/_assets/css/manage/SidneNav.module.css';

export default function SideNav() {
  return (
    <div className={styles.sideNav}>
      <Link href="/manage">
        <h1 className={styles.hdr}>Admin Panel</h1>
        <Img
          imgSrc={`icons/settings.png`}
          // imageStyle="white"
          imgAlt="Admin Panel"
          imgWidth={128}
          imgHeight={128}
        />
      </Link>
      <div>
        <ul className={styles.navItems}>
          <li>
            <Link href="/manage/add">Add Product</Link>
          </li>
          <li>
            <Link href="/manage">Sales Data</Link>
          </li>
          <li>
            <Link href="/manage">Reports</Link>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
        <Logout />
      </div>
    </div>
  );
}
