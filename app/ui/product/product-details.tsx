import WineBlurb from '@/app/ui/wine-blurb';
import ProductRating from './product-rating';
import ProductCart from './product-cart';
import Img from '@/app/ui/image';
import { ProductDetailsProps } from '../../lib/definitions';
import styles from '@/app/assets/css/product/ProductDetails.module.css';

const ProductDetails = ({
  id,
  brand,
  name,
  short_name,
  average,
  total,
  price_current,
  price_two_for,
  price_ten_for,
  price_percent_off,
  packaging,
  promotion_callout_text,
  promotion_discount_code,
  urlCategory,
  urlVariety,
  isCask,
}: ProductDetailsProps) => {
  return (
    <section className={styles.productCont}>
      <div className={styles.productImg}>
        <Img
          imgSrc={`wine/${id}.jpg`}
          imgAlt={name}
          imgWidth={isCask ? 339 : 120}
          imgHeight={520}
        />
      </div>
      <div className={styles.productMeta}>
        <h1 className={styles.brand}>{brand}</h1>
        <h2 className={styles.short_name}>{short_name}</h2>
        <WineBlurb urlCategory={urlCategory} urlVariety={urlVariety} />
        <ProductRating average={average} total={total} />
        <div className={styles.cartCont}>
          <ProductCart
            id={id}
            name={name}
            brand={brand}
            short_name={short_name}
            price_two_for={price_two_for}
            price_ten_for={price_ten_for}
            price_percent_off={price_percent_off}
            price_current={price_current}
            packaging={packaging}
            promotion_callout_text={promotion_callout_text}
            promotion_discount_code={promotion_discount_code}
            isCask={isCask}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
