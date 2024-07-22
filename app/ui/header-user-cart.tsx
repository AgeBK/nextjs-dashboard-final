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
  const dispatch = useDispatch();
  const pathname = usePathname().substring(1);

  useEffect(() => {
    const cart = sessionStorage.getItem('AKWineCart');
    if (cart) {
      const cartObj: CartProps = JSON.parse(cart);
      dispatch(restoreCart(cartObj));
    }
  }, []);

  return (
    <div className={styles.userCont}>
      {user ? (
        <div className={styles.userName}>{user.substring(0, 1)}</div>
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
// function restoreCart(arg0: {
//   id: any;
//   name: void;
//   brand: any;
//   short_name: any;
//   price: any;
//   quantity: any;
//   deal: any;
//   promotion_discount_code: any;
// }): any {
//   throw new Error('Function not implemented.');
// }
