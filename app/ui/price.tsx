import { PriceProps } from '../lib/definitions';
import styles from '@/app/assets/css/Price.module.css';

function Price({ current, normal }: PriceProps) {
  // price on category page & carousel
  return (
    <>
      {normal && current !== normal && (
        <span className={styles.normal}>${normal}</span>
      )}
      <span className={styles.current}>${current}</span>
    </>
  );
}

export default Price;
