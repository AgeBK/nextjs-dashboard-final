import { ItemSavingsProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/cart/CartItemSaving.module.css';

export default function CartItemSaving({
  price,
  dealPrice,
  quantity,
}: ItemSavingsProps) {
  // show savings when discount code or 2 for deals
  return dealPrice ? (
    <div className={styles.savings}>
      <span className={styles.triangle}></span>
      You save: ${((price - dealPrice) * quantity).toFixed(2)}
    </div>
  ) : null;
}
