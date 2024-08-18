import Link from 'next/link';
import { hyphenate, checkDeals } from '@/app/lib/utils';
import { DealProps, ProductItemProps } from '@/app/lib/definitions';
import data from '@/app/lib/appData.json';
import AddToCart from '../add-to-cart';
import Img from '../image';
import ImgFill from '../image-fill';
import PriceDrop from '../price-drop';
import Price from '../price';
import styles from '@/app/assets/css/product/ProductItem.module.css';

export default function ProductItem({ props, ind, css }: ProductItemProps) {
  const {
    id,
    category,
    variety,
    name,
    short_name,
    brand,
    ratings_average,
    price_normal,
    price_ten_for,
    price_two_for,
    price_current,
    price_percent_off,
    promotion_callout_text,
    promotion_discount_code,
  } = props;

  const deal: DealProps = checkDeals(
    price_two_for,
    price_ten_for,
    price_percent_off,
  );
  const onSpecial = price_current !== price_normal;
  const avg = Math.round(ratings_average);
  const { PRIORITY } = data;

  return (
    <div className={`${styles.product} ${css ? styles[css] : ''}`} key={id}>
      {promotion_callout_text || onSpecial ? (
        <PriceDrop promotion_callout_text={promotion_callout_text} />
      ) : null}
      <Link
        href={`/${category.toLowerCase()}/${hyphenate(
          variety.toLowerCase(),
        )}/${id}`}
        className={styles.itemCont}
      >
        <ImgFill
          imgSrc={`wine/${id}.jpg`}
          imgAlt=""
          imgStyle="product130h"
          imgPriority={ind < PRIORITY} // priority = max in view onload
        />
        <div className={styles.productMeta}>
          <h2 className={styles.brand}>{brand}</h2>
          <h3 className={styles.short_name}>{short_name}</h3>
          {avg && avg > 2 ? (
            <Img
              imgSrc={`bg/${avg}star.jpg`}
              imgAlt={`${avg} star`}
              imgWidth={avg * 15}
              imgHeight={15}
              imgPriority={ind < PRIORITY}
            />
          ) : null}
        </div>
      </Link>
      <Price current={price_current} normal={price_normal} />
      <div className={styles.addCont}>
        <AddToCart
          id={id}
          name={name}
          brand={brand}
          short_name={short_name}
          price={price_current}
          quantity={1}
          deal={deal}
          promotion_discount_code={promotion_discount_code}
        />
      </div>
    </div>
  );
}
