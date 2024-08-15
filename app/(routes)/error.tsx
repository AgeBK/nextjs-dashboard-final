'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Img from '@/app/ui/image';
import data from '@/app/lib/appData.json';
import styles from '@/app/assets/css/Error.module.css';

// TODO: test this, error.tsx
export default function Error() {
  const { errorMsg } = data;
  const pathname = usePathname();

  return (
    <section className={styles.container}>
      <Img
        imgSrc={'error/sad.png'}
        imgAlt="error"
        imgHeight={100}
        imgWidth={100}
      />
      <h2 className={styles.hdr}>
        <strong>Whoops!!</strong>
        <div>{errorMsg}</div>
      </h2>
      <div>Sorry for the inconvenience</div>
      <Link href={pathname} className={styles.link}>
        Reload page
      </Link>
    </section>
  );
}
