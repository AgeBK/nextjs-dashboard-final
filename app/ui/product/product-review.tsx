import { reviews, productSource } from '@/app/lib/appData.json';
import { KeyStringProps, ProductReviewProps } from '../../lib/definitions';
import styles from '@/app/assets/css/product/ProductReview.module.css';

export default function ProductReview({
  urlCategory,
  variety,
}: ProductReviewProps) {
  const review: KeyStringProps = reviews;

  return (
    <div className={styles.reviews}>
      <h2>Product Review:</h2>
      {urlCategory && review[urlCategory]}
      <div
        className={styles.source}
        dangerouslySetInnerHTML={{
          __html: productSource.replace('[variety]', variety),
        }}
      ></div>
    </div>
  );
}
