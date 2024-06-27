'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Img from './image';
import Cart from './cart/cart';
import styles from '@/app/_assets/css/Header.module.css';

export default function HeaderUserCart({ name }: { name: string | null }) {
  const pathname = usePathname().substring(1);

  return (
    <div className={styles.userCont}>
      {name ? (
        <div className={styles.userName}>{name.substring(0, 1)}</div>
      ) : (
        <div className={styles.userContainer}>
          <Link href={`/login?callbackUrl=${pathname}`}>
            <Img
              imgSrc={'icons/user.svg'}
              imgAlt="Login"
              imgWidth={24}
              imgHeight={24}
            />
          </Link>
        </div>
      )}
      <div className={styles.cartCont}>
        <Cart />
      </div>
    </div>
  );
}
