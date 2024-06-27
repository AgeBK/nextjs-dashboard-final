import Link from 'next/link';
import { campaingMini } from '../lib/appData.json';
import { CampainMiniProps } from '../lib/definitions';
import styles from '@/app/_assets/css/Home.module.css';
import Img from './image';

export default function HomeCampaignMini() {
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
