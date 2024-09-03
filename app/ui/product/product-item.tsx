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
 // used when rendering array of products on category page & carousel
 const {
    id,
    category,
    variety,
    name,
    shortName,
    brand,
    ratingsAverage,
    priceNormal,
    priceTenFor,
    priceTwoFor,
    priceCurrent,
    pricePercentOff,
    promotionCalloutText,
    promotionDiscountCode,
  } = props;

  const deal: DealProps = checkDeals(priceTwoFor, priceTenFor, pricePercentOff);
  const onSpecial = priceCurrent !== priceNormal;
  const avg = Math.round(ratingsAverage);
  const { PRIORITY } = data;

  return (
    <div className={`${styles.product} ${css ? styles[css] : ''}`} key={id}>
      {promotionCalloutText || onSpecial ? (
        <PriceDrop promotionCalloutText={promotionCalloutText} />
      ) : null}
      <Link
        href={`/${category.toLowerCase()}/${hyphenate(
          variety.toLowerCase(),
        )}/${id}`}
        className={styles.itemCont}
      >
        <ImgFill
          imgSrc={`wine/${id}.webp`}
          imgAlt=""
          imgStyle="product130h"
          imgPriority={ind < PRIORITY} // priority = max in view onload
        />
        <div className={styles.productMeta}>
          <h2 className={styles.brand}>{brand}</h2>
          <h3 className={styles.shortName}>{shortName}</h3>
          {avg && avg > 2 ? (
            <Img
              imgSrc={`rating/${avg}star.jpg`}
              imgAlt={`${avg} star`}
              imgWidth={avg * 15}
              imgHeight={15}
              imgPriority={ind < PRIORITY}
            />
          ) : null}
        </div>
      </Link>
      <Price current={priceCurrent} normal={priceNormal} />
      <div className={styles.addCont}>
        <AddToCart
          id={id}
          name={name}
          brand={brand}
          shortName={shortName}
          price={priceCurrent}
          quantity={1}
          deal={deal}
          promotionDiscountCode={promotionDiscountCode}
        />
      </div>
    </div>
  );
}
