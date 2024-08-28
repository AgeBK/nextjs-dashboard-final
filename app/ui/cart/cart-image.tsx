import Img from '../image';

export default function CartImage({ itemAdded }: { itemAdded: boolean }) {
  return (
    <Img
      imgSrc={`icons/${itemAdded ? 'cartNotEmpty' : 'cartEmpty'}.svg`}
      imgAlt=""
      imgWidth={24}
      imgHeight={24}
    />
  );
}
