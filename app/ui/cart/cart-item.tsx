import { useSelector, useDispatch } from 'react-redux';
import { selectCart, increment, decrement } from '../../slices/cartSlice';
import CartPrice from './cart-price';
import CartItemSaving from './cart-item-savings';
import Img from '../image';
import { Button } from '../button';
import { CartProps, AddToCartProps } from '@/app/lib/definitions';
import styles from '@/app/_assets/css/CartItem.module.css';

const CartItem = () => {
  const cart: CartProps = useSelector(selectCart);
  const dispatch = useDispatch();

  const addToCart = ({
    id,
    name,
    brand,
    short_name,
    price,
    quantity,
    deal,
    discountCode,
  }: AddToCartProps) => {
    dispatch(
      increment({
        id,
        name,
        brand,
        short_name,
        price,
        quantity,
        deal,
        discountCode,
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
            short_name,
            quantity,
            price,
            deal,
            dealPrice,
            discountCode,
          },
        ]) => (
          <li className={styles.itemCont} key={id} value={name}>
            <div className={styles.item}>
              <div className={styles.cartImg}>
                <Img
                  imageSrc={`wine/${id}.jpg`}
                  imageAlt={name}
                  imageWidth={20}
                  imageHeight={80}
                />
              </div>
              <div className={styles.cartProd}>
                <h3 className={styles.hdr}>{brand}</h3>
                <div className={styles.short_name}>{short_name}</div>
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
                          short_name,
                          price,
                          quantity: 1,
                          deal,
                          discountCode,
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
                    imageSrc={`btn/remove.png`}
                    imageAlt={name}
                    imageWidth={30}
                    imageHeight={30}
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
};

export default CartItem;
