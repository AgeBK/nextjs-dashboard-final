'use client';

import { useState } from 'react';
import { ProductCartProps } from '@/app/lib/definitions';
import { checkDeals } from '@/app/lib/utils';
import Button from '../button';
import AddToCart from '../add-to-cart';
import Img from '../image';
import styles from '@/app/assets/css/product/ProductCart.module.css';

export default function ProductCart({
  id,
  name,
  brand,
  short_name,
  price_current,
  price_two_for,
  price_ten_for,
  price_percent_off,
  packaging,
  promotion_callout_text,
  promotion_discount_code,
  isCask,
}: ProductCartProps) {
  const [count, setCount] = useState<number>(1);

  const handleCount = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { textContent } = e.currentTarget;
    if (textContent === '+') {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  };

  const deal = checkDeals(price_two_for, price_ten_for, price_percent_off);

  return (
    <div className={styles.cartTableCont}>
      <div className={styles.cartTable}>
        <div className={styles.cartBottle}>
          <div className={styles.packImg}>
            <Img
              imgSrc={isCask ? `icons/barrelSil.png` : `icons/wineSil.png`}
              imgAlt=""
              imgWidth={18}
              imgHeight={40}
            />
          </div>
          <div className={styles.price}>
            ${price_current}/{packaging}
          </div>
        </div>
        <div className={styles.cartAmt}>
          {/* <div className={styles.totalPrice}>${price_current * count}</div> */}
          <Button css="cartLge" onClick={handleCount} disabled={count < 2}>
            -
          </Button>
          <span className={styles.count}>{count}</span>
          <Button css="cartLge" onClick={handleCount}>
            +
          </Button>
        </div>
        <div className={styles.cartAdd}>
          <AddToCart
            id={id}
            name={name}
            brand={brand}
            short_name={short_name}
            price={price_current}
            quantity={count}
            deal={deal}
            promotion_discount_code={promotion_discount_code}
          />
        </div>
      </div>
      {price_two_for || price_ten_for || price_percent_off ? (
        <div className={styles.cartprice_two_for}>{promotion_callout_text}</div>
      ) : null}
    </div>
  );
}
