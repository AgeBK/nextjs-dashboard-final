import data from '@/app/lib/appData.json';
import { KeyStringProps, WineBlurbProps } from '../lib/definitions';
import styles from '@/app/assets/css/WineBlurb.module.css';

const WineBlurb = ({ urlCategory, urlVariety }: WineBlurbProps) => {
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

export default WineBlurb;
