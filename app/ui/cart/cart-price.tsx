import styles from '@/app/assets/css/cart/CartPrice.module.css';

type CartPriceProps = {
  price: number;
  dealPrice?: number;
  quantity: number;
};

const CartPrice = ({ price, quantity, dealPrice }: CartPriceProps) => {
  const cartPrice = (dealPrice || price) * quantity;
  return <div className={styles.price}>${cartPrice.toFixed(2)}</div>;
};

export default CartPrice;
