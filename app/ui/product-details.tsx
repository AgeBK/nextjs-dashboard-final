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
  price_two_for: number;
  price_ten_for: number;
  price_percent_off: number;
  current: number;
  packaging: string;
  promotion_callout_text?: string;
  promotion_discount_code?: string;
  urlCategory?: string;
  urlVariety?: string;
  // isSmallScreen: boolean; // TODO:??
};

const ProductDetails = ({
  id,
  brand,
  name,
  short_name,
  average,
  total,
  price_two_for,
  price_ten_for,
  price_percent_off,
  current,
  packaging,
  promotion_callout_text,
  promotion_discount_code,
  urlCategory,
  urlVariety,
}: // isSmallScreen,
ProductDetailsProps) => {
  const isBottle = packaging === 'Bottle';

  return (
    <section className={styles.productCont}>
      <div className={styles.productImg}>
        <Img
          imageSrc={`wine/${id}.jpg`}
          imageStyle={
            packaging === 'Bottle' ? 'productMain' : 'productMainCask'
          }
          imageAlt={name}
          imageWidth={isBottle ? 120 : 339}
          imageHeight={520}
        />
      </div>
      <div className={styles.productMeta}>
        <h1 className={styles.brand}>{brand}</h1>
        <h2 className={styles.short_name}>{short_name}</h2>
        <WineBlurb urlCategory={urlCategory} urlVariety={urlVariety} />
        <ProductRating average={average} total={total} />
        {/* {!isSmallScreen && ( */}
        <ProductCart
          id={id}
          name={name}
          brand={brand}
          short_name={short_name}
          price_two_for={price_two_for}
          price_ten_for={price_ten_for}
          price_percent_off={price_percent_off}
          current={current}
          packaging={packaging}
          promotion_callout_text={promotion_callout_text}
          promotion_discount_code={promotion_discount_code}
        />
        {/* )} */}
      </div>
    </section>
  );
};

export default ProductDetails;
