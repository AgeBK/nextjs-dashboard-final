'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Img from '@/app/ui/image';
import styles from '@/app/assets/css/Error.module.css';

export default function ErrorMain({ message }: { message: string }) {
  const pathname = usePathname();
  console.log(`error - ${message}`);

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
        <div>{message}</div>
      </h2>
      <div>Sorry for the inconvenience</div>
      <Link href={pathname} className={styles.navigate}>
        Reload page
      </Link>{' '}
      <Link href={pathname} className={styles.navigate}>
        Go home
      </Link>
    </section>
  );
}
