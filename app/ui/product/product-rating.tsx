import Img from '@/app/ui/image';
import styles from '@/app/_assets/css/product/ProductRating.module.css';

type ProductRatingProps = {
  average: number;
  total: number;
};

export default function ProductRating({ average, total }: ProductRatingProps) {
  const avg = Math.round(average);
  return (
    <>
      {avg > 2 ? (
        <>
          <Img
            imgSrc={`bg/${avg}starLge.png`}
            imgAlt={`${avg} star rating`}
            imgHeight={32}
            imgWidth={avg * 32}
          />
          <div className={styles.totalRate}>{total} Reviews</div>
        </>
      ) : null}
    </>
  );
}
