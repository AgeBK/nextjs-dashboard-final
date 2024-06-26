// 'use client'; // TODO:
import Link from 'next/link';
import Img from '@/app/ui/image';
import { errorMsg } from '@/app/lib/appData.json';
import styles from '@/app/_assets/css/Error.module.css';

// TODO: not using??
export default function Error() {
  return (
    <section className={styles.container}>
      <Img
        imageSrc={'error/sad.png'}
        imageAlt="error"
        imageHeight={100}
        imageWidth={100}
      />
      <h2 className={styles.hdr}>
        <strong>Whoops!!</strong>
        <div>{errorMsg}</div>
      </h2>
      <div>Sorry for the inconvenience</div>
      <Link href="/" className={styles.link}>
        Back to homepage
      </Link>
    </section>
  );
}
