import Link from 'next/link';
import { hyphenate, checkDeals } from '@/app/lib/utils';
import AddToCart from '@/app/ui/add-to-cart';
import Img from '@/app/ui/image';
import PriceDrop from '@/app/ui/price-drop';
import Price from '@/app/ui/price';
import styles from '@/app/_assets/css/product/ProductItem.module.css';
import { DealProps } from '@/app/lib/definitions';

type ProductItemProps = {
  props: {
    id: string;
    category: string;
    variety: string;
    name: string;
    short_name: string;
    brand: string;
    packaging: string;
    ratings_average: number;
    price_current: number;
    price_normal: number;
    price_two_for?: number;
    price_percent_off?: number;
    price_ten_for?: number;
    promotion_callout_text?: string;
    promotion_discount_code?: string;
  };
  css?: string;
};

const ProductItem = ({ props, css }: ProductItemProps) => {
  const {
    id,
    category,
    variety,
    name,
    short_name,
    brand,
    packaging,
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
  const onSpecial: number | null =
    price_current !== price_normal ? price_current : null;
  const avg = Math.round(ratings_average);

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
        <Img
          imageSrc={`wine/${id}.jpg`}
          imageStyle="campaignMini"
          imageAlt={name}
          imageWidth={packaging === 'Bottle' ? 40 : 100}
          imageHeight={150}
        />
        <div className={styles.productMeta}>
          <h2 className={styles.brand}>{brand}</h2>
          <h3 className={styles.short_name}>{short_name}</h3>
          {avg && avg > 2 ? (
            <Img
              imageSrc={`bg/${avg}star.jpg`}
              imageStyle="block"
              imageAlt={`${avg} star`}
              imageWidth={avg * 15}
              imageHeight={15}
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
};

export default ProductItem;
