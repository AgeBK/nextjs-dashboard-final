'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../../slices/cartSlice';
import useCartState from '@/app/hooks/useCartState';
import CartOpen from './cart-open';
import CartClosed from './cart-closed';
import {
  CartProps,
  CartItemProps,
  CartQtyPriceProps,
} from '@/app/lib/definitions';
import styles from '@/app/assets/css/cart/Cart.module.css';

const Cart = () => {
  const [discountCode, setDiscountCode] = useState<string>(''); // set here to keep value on cart closed
  const cart: CartProps = useSelector(selectCart);
  const [ref, isOpen, handleClose] = useCartState();

  const CartQtyPrice: CartQtyPriceProps = Object.values(cart).reduce(
    (acc: CartQtyPriceProps, { quantity, price, dealPrice }: CartItemProps) => {
      acc.totalQty += quantity;
      acc.totalPrice += (dealPrice || price) * quantity;
      return acc;
    },
    {
      totalQty: 0,
      totalPrice: 0,
    },
  );

  const { totalPrice, totalQty } = CartQtyPrice;

  return (
    <div className={styles.cartOuterContainer} ref={ref}>
      <div className={styles.container}>
        {isOpen && totalQty && totalPrice ? (
          <CartOpen
            totalPrice={totalPrice}
            totalQty={totalQty}
            handleClose={handleClose}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
          />
        ) : (
          <CartClosed totalPrice={totalPrice} totalQty={totalQty} />
        )}
      </div>
    </div>
  );
};

export default Cart;
