import { PriceProps } from '../lib/definitions';
import styles from '@/app/assets/css/Price.module.css';

// price on category page & carousel
function Price({ current, normal }: PriceProps) {
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
