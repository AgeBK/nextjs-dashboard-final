import data from '@/app/lib/appData.json';
import { KeyStringProps, ProductReviewProps } from '../../lib/definitions';
import styles from '@/app/assets/css/product/ProductReview.module.css';

export default function ProductReview({
  urlCategory,
  variety,
}: ProductReviewProps) {
  const {
    reviews,
    productSource,
  }: { reviews: KeyStringProps; productSource: string } = data;

  return (
    <div className={styles.reviews}>
      <h2>Product Review:</h2>
      <div className={styles.review}>{urlCategory && reviews[urlCategory]}</div>
      <div
        className={styles.source}
        dangerouslySetInnerHTML={{
          __html: productSource.replace('[variety]', variety),
        }}
      ></div>
    </div>
  );
}
