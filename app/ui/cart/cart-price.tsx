import { CartPriceProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/cart/CartPrice.module.css';

export default function CartPrice({
  price,
  quantity,
  dealPrice,
}: CartPriceProps) {
  const cartPrice = (dealPrice || price) * quantity;
  return <div className={styles.price}>${cartPrice.toFixed(2)}</div>;
}
