import WineBlurb from '@/app/ui/wine-blurb';
import ProductRating from '@/app/ui/product-rating';
import ProductCart from '@/app/ui/product-cart';
import Img from '@/app/ui/image';
import styles from '@/app/_assets/css/product/ProductDetails.module.css';

type ProductDetailsProps = {
  id: string;
  name: string;
  brand: string;
  short_name: string;
  average: number;
  total: number;
  price_current: number;
  price_two_for: number;
  price_ten_for: number;
  price_percent_off: number;
  packaging: string;
  promotion_callout_text?: string;
  promotion_discount_code?: string;
  urlCategory?: string;
  urlVariety?: string;
  isCask: boolean;
};

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
