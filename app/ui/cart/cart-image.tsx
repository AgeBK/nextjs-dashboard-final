import Img from '../image';

const CartImage = ({ itemAdded }: { itemAdded: boolean }) => (
  <Img
    imgSrc={`icons/${itemAdded ? 'cartNotEmpty' : 'cartEmpty'}.svg`}
    // imageStyle="" // TODO:
    imgAlt="cart"
    imgWidth={16}
    imgHeight={16}
  />
);

export default CartImage;
