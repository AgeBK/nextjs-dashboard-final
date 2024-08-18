import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { applyDiscountCode } from '../../slices/cartSlice';
import { CartOpenProps } from '@/app/lib/definitions';
import CartItem from './cart-item';
import Button from '../button';
import styles from '@/app/assets/css/cart/CartOpen.module.css';

export default function CartOpen({
  totalPrice,
  totalQty,
  handleClose,
  discountCode,
  setDiscountCode,
}: CartOpenProps) {
  const dispatch = useDispatch();
  const [codeEntered, setCodeEntered] = useState(false);

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      dispatchDiscountCode();
    } else if (codeEntered === true) {
      setCodeEntered(false);
    }
  };

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setDiscountCode(value);

  const dispatchDiscountCode = () => {
    setCodeEntered(true);
    dispatch(applyDiscountCode(discountCode));
  };

  return (
    <section className={styles.cart}>
      <div className={styles.totalItems}>
        <span>{totalQty} </span>
        items in your shopping cart
        <Button css="close" onClick={handleClose}>
          X
        </Button>
      </div>
      <CartItem />
      <div className={styles.discountCode}>
        <input
          className={styles.inputCode}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Enter promo/discount code here"
          value={discountCode}
        />
        <Button css="discount" onClick={dispatchDiscountCode}>
          Apply
        </Button>
      </div>
      {codeEntered && <div className={styles.codeEntered}>Code entered:</div>}
      <div className={styles.total}>
        <span>
          Total Items: <b>{totalQty}</b>
        </span>
        <span className={styles.totalPrice}>
          Total: ${totalPrice.toFixed(2)}
        </span>
      </div>
    </section>
  );
}
