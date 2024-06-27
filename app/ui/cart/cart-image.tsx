import Img from '../image';

const CartImage = ({ itemAdded }: { itemAdded: boolean }) => (
  <Img
    imgSrc={`icons/${itemAdded ? 'cartNotEmpty' : 'cartEmpty'}.svg`}
    imageStyle=""
    imgAlt="cart"
    imgWidth={20}
    imgHeight={20}
  />
);

export default CartImage;
