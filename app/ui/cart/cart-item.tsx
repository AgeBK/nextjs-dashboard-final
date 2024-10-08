import { useSelector, useDispatch } from 'react-redux';
import { selectCart, increment, decrement } from '../../slices/cartSlice';
import { CartProps, AddToCartProps } from '@/app/lib/definitions';
import CartPrice from './cart-price';
import CartItemSaving from './cart-item-savings';
import Img from '../image';
import Button from '../button';
import styles from '@/app/assets/css/cart/CartItem.module.css';

export default function CartItem() {
  const cart: CartProps = useSelector(selectCart);
  const dispatch = useDispatch();

  const addToCart = ({
    id,
    name,
    brand,
    shortName,
    price,
    quantity,
    deal,
    promotionDiscountCode,
  }: AddToCartProps) => {
    dispatch(
      increment({
        id,
        name,
        brand,
        shortName,
        price,
        quantity,
        deal,
        promotionDiscountCode,
      }),
    );
  };

  const removeFromCart = (id: string, all: boolean) =>
    dispatch(decrement({ id, all }));

  return (
    <ul className={styles.list}>
      {Object.entries(cart).map(
        ([
          id,
          {
            name,
            brand,
            shortName,
            quantity,
            price,
            deal,
            dealPrice,
            promotionDiscountCode,
          },
        ]) => (
          <li className={styles.itemCont} key={id} value={name}>
            <div className={styles.item}>
              <div className={styles.cartImg}>
                <Img
                  imgSrc={`wine/${id}.webp`}
                  imgAlt={name}
                  imgWidth={20}
                  imgHeight={80}
                />
              </div>
              <div className={styles.cartProd}>
                <h3 className={styles.hdr}>{brand}</h3>
                <div className={styles.shortName}>{shortName}</div>
                <div className={styles.buttons}>
                  <span className={styles.oneItem}>
                    <Button
                      onClick={() => {
                        removeFromCart(id, false);
                      }}
                      css="cartMinus"
                    ></Button>
                    <span className={styles.amount}>{quantity}</span>
                    <Button
                      onClick={() => {
                        addToCart({
                          id,
                          name,
                          brand,
                          shortName,
                          price,
                          quantity: 1,
                          deal,
                          promotionDiscountCode,
                        });
                      }}
                      css="cartAdd"
                    ></Button>
                  </span>
                </div>
              </div>
              <div className={styles.details}>
                <Button
                  onClick={() => {
                    removeFromCart(id, true);
                  }}
                  css="noStyle"
                >
                  <Img
                    imgSrc={`btn/remove.png`}
                    imgAlt={name}
                    imgWidth={30}
                    imgHeight={30}
                  />
                </Button>
                <CartPrice
                  quantity={quantity}
                  price={price}
                  dealPrice={dealPrice}
                />
              </div>
            </div>
            <div className={styles.itemSavings}>
              <CartItemSaving
                price={price}
                dealPrice={dealPrice}
                quantity={quantity}
              />
            </div>
          </li>
        ),
      )}
    </ul>
  );
}
