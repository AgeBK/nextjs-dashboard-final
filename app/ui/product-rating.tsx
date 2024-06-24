import Img from '@/app/ui/image';
import styles from '@/app/_assets/css/product/ProductRating.module.css';

type ProductRatingProps = {
  average: number;
  total: number;
};

const ProductRating = ({ average, total }: ProductRatingProps) => {
  // TODO: use export function
  const avg = Math.round(average);
  return (
    <>
      {avg > 2 ? (
        <>
          <Img
            imageSrc={`bg/${avg}starLge.png`}
            imageStyle=""
            imageAlt={`${avg} star rating`}
            imageHeight={32}
            imageWidth={avg * 32}
          />
          <div className={styles.totalRate}>{total} Reviews</div>
        </>
      ) : null}
    </>
  );
};

export default ProductRating;
