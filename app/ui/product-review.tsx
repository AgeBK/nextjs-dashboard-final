import { reviews, productSource } from "@/app/lib/appData.json";
import styles from "@/app/_assets/css/ProductReview.module.css";
import { KeyStringProps, ProductReviewProps } from "../lib/definitions";
const review: KeyStringProps = reviews;

const ProductReview = ({ urlCategory, variety }: ProductReviewProps) => {
  return (
    <div className={styles.reviews}>
      <h2>Product Review:</h2>
      {urlCategory && review[urlCategory]}
      <div
        className={styles.source}
        dangerouslySetInnerHTML={{
          __html: productSource.replace("[variety]", variety),
        }}
      ></div>
    </div>
  );
};

export default ProductReview;
