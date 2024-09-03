import Link from 'next/link';
import Img from '@/app/ui/image';
import { ProductBreadCrumbProps } from '../../lib/definitions';
import styles from '@/app/assets/css/BreadCrumb.module.css';

const Chevron = () => (
  <span className={styles.chevronCont}>
    <span className={styles.chevron}></span>
    <span className={styles.chevron}></span>
  </span>
);

export default function ProductBreadCrumb({
  urlCategory,
  urlVariety,
  category,
  variety,
}: ProductBreadCrumbProps) {
  // bread crumb displayed on the product page
  return (
    <div className={styles.breadCrumb}>
      <Link href="/" className={styles.category}>
        <Img
          imgSrc={`icons/home.png`}
          imgAlt="AK Fine Wines"
          imgWidth={17}
          imgHeight={14}
        />
        Home
      </Link>
      <Chevron />
      <Link href={`/${urlCategory}`} className={styles.category}>
        {category}
      </Link>
      <Chevron />
      <Link href={`/${urlCategory}/${urlVariety}`} className={styles.category}>
        {variety}
      </Link>
    </div>
  );
}
