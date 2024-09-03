import data from '@/app/lib/appData.json';
import { KeyStringProps, WineBlurbProps } from '../../lib/definitions';
import styles from '@/app/assets/css/product/ProductWineBlurb.module.css';

const ProductWineBlurb = ({ urlCategory, urlVariety }: WineBlurbProps) => {
  // TODO: http://localhost:3000/red/pinot-noir/3901656 blurb on product, not category??
  const { blurb }: { blurb: KeyStringProps } = data;
  let synopsis = '';
  if (urlVariety && blurb[urlVariety]) {
    synopsis = blurb[urlVariety];
  } else if (urlCategory && blurb[urlCategory]) {
    synopsis = blurb[urlCategory];
  }

  return synopsis ? (
    <div className={styles.productBlurb}>{synopsis}</div>
  ) : null;
};

export default ProductWineBlurb;
