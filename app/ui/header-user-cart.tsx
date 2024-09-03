'use client';

import { useDispatch } from 'react-redux';
import { restoreCart } from './../slices/cartSlice';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CartProps } from '../lib/definitions';
import Link from 'next/link';
import Img from './image';
import Cart from './cart/cart';
import styles from '@/app/assets/css/Header.module.css';

export default function HeaderUserCart({ user }: { user: string | null }) {
  // loads cart and user status (login in or not)
  const dispatch = useDispatch();
  const pathname = usePathname().substring(1);
  const loginUrl = '/login';

  const getPath = () =>
    pathname ? `${loginUrl}?callbackUrl=${pathname}` : loginUrl;

  useEffect(() => {
    const cart = sessionStorage.getItem('AKWineCart');
    if (cart) {
      const cartObj: CartProps = JSON.parse(cart);
      dispatch(restoreCart(cartObj));
    }
  }, [dispatch]);

  return (
    <div className={styles.userCont}>
      {user ? (
        <div className={styles.user}>
          <div className={styles.userCircle}>{user.substring(0, 1)}</div>
        </div>
      ) : (
        <div className={styles.user}>
          <Link href={getPath()}>
            <Img
              imgSrc={'icons/user.svg'}
              imgAlt="Login"
              imgWidth={26}
              imgHeight={26}
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
