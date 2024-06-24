import Img from '../image';
import styles from '@/app/_assets/css/cart/CartClosed.module.css';

type CartClosedProps = {
  totalPrice: number;
  totalQty: number;
};

const CartClosed = ({ totalPrice, totalQty }: CartClosedProps) => {
  const notEmpty: boolean = totalQty > 0 && totalPrice > 0;
  const cartImage: string = notEmpty ? 'cartNotEmpty' : 'cartEmpty';

  return (
    <div className={styles.cartClosedCont}>
      <span
        className={`${styles.cartClosedQty} ${
          totalQty ? styles.cartClosedContQty : ''
        }`}
      >
        {totalQty}
      </span>
      <Img
        imageSrc={`icons/${cartImage}.png`}
        imageStyle="cart"
        imageAlt="cart"
        imageWidth={30}
        imageHeight={30}
      />
      {notEmpty && (
        <div className={styles.totalPrice}>${totalPrice.toFixed(2)}</div>
      )}
    </div>
  );
};

export default CartClosed;
