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
  shortName,
  priceCurrent,
  priceTwoFor,
  priceTenFor,
  pricePercentOff,
  packaging,
  promotionCalloutText,
  promotionDiscountCode,
  isCask,
}: ProductCartProps) {
  // product page cart
  const [count, setCount] = useState<number>(1);

  const handleCount = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { textContent } = e.currentTarget;
    if (textContent === '+') {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
  };

  const deal = checkDeals(priceTwoFor, priceTenFor, pricePercentOff);

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
            ${priceCurrent}/{packaging}
          </div>
        </div>
        <div className={styles.cartAmt}>
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
            shortName={shortName}
            price={priceCurrent}
            quantity={count}
            deal={deal}
            promotionDiscountCode={promotionDiscountCode}
          />
        </div>
      </div>
      {priceTwoFor || priceTenFor || pricePercentOff ? (
        <div className={styles.cartpriceTwoFor}>{promotionCalloutText}</div>
      ) : null}
    </div>
  );
}
