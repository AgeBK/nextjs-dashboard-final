import Img from '../image';

const CartImage = ({ itemAdded }: { itemAdded: boolean }) => (
  <Img
    imageSrc={`icons/${itemAdded ? 'cartNotEmpty' : 'cartEmpty'}.svg`}
    imageStyle=""
    imageAlt="cart"
    imageWidth={20}
    imageHeight={20}
  />
);

export default CartImage;
