import Img from '@/app/ui/image';
import { paymentArr } from '@/app/lib/appData.json';
import { signOut } from '@/auth';
import { auth } from '../../auth';
import Logout from './logout';
import styles from '@/app/assets/css/Footer.module.css';
import Link from 'next/link';

export default async function Footer() {
  const yr = new Date().getFullYear();
  const arr: string[] = paymentArr;
  const session = await auth();

  // {
  //   session?.user && (
  //     <form
  //       action={async () => {
  //         'use server';
  //         await signOut();
  //       }}
  //     >
  //       <button>Sign Out</button>
  //     </form>
  //   );
  // }

  return (
    <footer className={styles.container}>
      <div className={styles.ak}>
        © {yr}{' '}
        <a
          href="https://github.com/AgeBK/ak-fine-wine-ts?tab=readme-ov-file#about"
          target="_blank"
        >
          AK Fine Wines
        </a>{' '}
        All rights reserved.
        <div>
          <Logout />
          <span className={styles.manage}>
            <Link href="/manage">Manage</Link>
          </span>
        </div>
      </div>
      <ul className={styles.list}>
        {arr.map((val, ind) => (
          <li key={ind}>
            <Img
              imgSrc={`payment/${val}.jpg`}
              imageStyle="footer"
              imgAlt={val}
              imgWidth={48}
              imgHeight={44}
            />
          </li>
        ))}
      </ul>
    </footer>
  );
}
