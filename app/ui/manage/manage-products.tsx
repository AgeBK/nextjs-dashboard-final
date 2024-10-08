import Link from 'next/link';
import { hyphenate } from '@/app/lib/utils';
import { ManageProductsProps } from '@/app/lib/definitions';
import Img from '@/app/ui/image';
import styles from '@/app/assets/css/manage/ManageProducts.module.css';

// lists products main manage page
export default function ManageProducts({ props }: ManageProductsProps) {
  const { id, category, variety, name, brand, priceNormal, priceCurrent } =
    props;

  return (
    <div key={id} className={styles.row}>
      <div className={styles.col}>{id}</div>
      <div className={`${styles.col} ${styles.name}`}>{name}</div>
      <div className={`${styles.col} ${styles.brand}`}>{brand}</div>
      <div className={`${styles.col} ${styles.category}`}>{category}</div>
      <div className={`${styles.col} ${styles.variety}`}>{variety}</div>
      <div className={`${styles.col} ${styles.price}`}>
        {priceNormal} / <span> {priceCurrent}</span>
      </div>
      <div className={`${styles.col} ${styles.actions}`}>
        <Link
          href={`/${category.toLowerCase()}/${hyphenate(
            variety.toLowerCase(),
          )}/${id}`}
        >
          <Img
            imgSrc={`icons/eye.svg`}
            imgAlt="view"
            imgWidth={24}
            imgHeight={24}
          />
        </Link>
        <Link href={`/manage/edit/${id}`}>
          <Img
            imgSrc={`icons/pencil.svg`}
            imgAlt="edit"
            imgWidth={24}
            imgHeight={24}
          />
        </Link>
        <Link href={`/manage/delete/${id}`}>
          <Img
            imgSrc={`icons/trash.svg`}
            imgAlt="trash"
            imgWidth={24}
            imgHeight={24}
          />
        </Link>
      </div>
    </div>
  );
}
