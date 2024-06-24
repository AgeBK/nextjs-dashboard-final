import Link from 'next/link';
// import NavLinks from '@/app/ui/dashboard/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
// import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { Dancing_Script } from 'next/font/google';

import Img from '@/app/ui/image';
import styles from '@/app/_assets/css/manage/SidneNav.module.css';

import Logout from '../logout';

export default function SideNav() {
  return (
    <div className={styles.sideNav}>
      <Link href="/manage">
        <h1 className={styles.hdr}>Admin Panel</h1>
        <Img
          imageSrc={`icons/settings.png`}
          imageStyle="white"
          imageAlt="Admin Panel"
          imageWidth={128}
          imageHeight={128}
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
