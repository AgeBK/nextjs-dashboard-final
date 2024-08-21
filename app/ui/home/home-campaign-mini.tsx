import Link from 'next/link';
import data from '../../lib/appData.json';
import Img from '../image';
import { CampainMiniProps } from '../../lib/definitions';
import styles from '@/app/assets/css/Home.module.css';

export default function HomeCampaignMini() {
  const { campaingMini } = data;
  return (
    <div className={styles.campaignMini}>
      {campaingMini.map(
        ({
          id,
          link,
          hdr,
          blurb1,
          blurb2,
          imgSrc,
          imgAlt,
        }: CampainMiniProps) => (
          <div className={styles.offer} key={id}>
            <Link href={link}>
              <h3 className={styles.hdr}>{hdr}</h3>
              <div className={styles.price_two_forBlurb}>{blurb1}</div>
              <div className={styles.price_two_forBlurb}>{blurb2}</div>
              <Img
                imgSrc={imgSrc}
                imgAlt={imgAlt}
                imgWidth={227}
                imgHeight={150}
              />
              <h3 className={styles.shopNow}>SHOP NOW</h3>
            </Link>
          </div>
        ),
      )}
    </div>
  );
}
