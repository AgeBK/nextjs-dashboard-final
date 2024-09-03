import Link from 'next/link';
import { HomeCampaignProps } from '../../lib/definitions';
import styles from '@/app/assets/css/Home.module.css';

export default function HomeCampaign({
  link,
  hdr,
  text,
  finePrint,
}: HomeCampaignProps) {
  // Banner style add on home page
  return (
    <div className={styles.campaign}>
      <Link href={`/${link}`}>
        <h2 className={styles.tenOff}>{hdr}</h2>
        <h2 className={styles.selected}>{text}</h2>
        <h2 className={styles.shopNow}>SHOP NOW</h2>
        <div className={styles.finePrint}>{finePrint}</div>
      </Link>
    </div>
  );
}
