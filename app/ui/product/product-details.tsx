import { ProductDetailsProps } from '../../lib/definitions';
import WineBlurb from '../wine-blurb';
import ProductRating from './product-rating';
import ProductCart from './product-cart';
import ImgFill from './../image-fill';
import styles from '@/app/assets/css/product/ProductDetails.module.css';

export default function ProductDetails({
  id,
  brand,
  name,
  shortName,
  average,
  total,
  priceCurrent,
  priceTwoFor,
  priceTenFor,
  pricePercentOff,
  packaging,
  promotionCalloutText,
  promotionDiscountCode,
  urlCategory,
  urlVariety,
  isCask,
}: ProductDetailsProps) {
  return (
    <section className={styles.productCont}>
      <div className={styles.productImg}>
        <ImgFill
          imgSrc={`wine/${id}.webp`}
          imgAlt={name}
          imgStyle="product520h"
          imgPriority={true}
        />
      </div>
      <div className={styles.productMeta}>
        <h1 className={styles.brand}>{brand}</h1>
        <h2 className={styles.shortName}>{shortName}</h2>
        <WineBlurb urlCategory={urlCategory} urlVariety={urlVariety} />
        <ProductRating average={average} total={total} />
        <div className={styles.cartCont}>
          <ProductCart
            id={id}
            name={name}
            brand={brand}
            shortName={shortName}
            priceTwoFor={priceTwoFor}
            priceTenFor={priceTenFor}
            pricePercentOff={pricePercentOff}
            priceCurrent={priceCurrent}
            packaging={packaging}
            promotionCalloutText={promotionCalloutText}
            promotionDiscountCode={promotionDiscountCode}
            isCask={isCask}
          />
        </div>
      </div>
    </section>
  );
}
