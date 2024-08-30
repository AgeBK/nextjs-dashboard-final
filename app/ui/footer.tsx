import Link from 'next/link';
import data from '@/app/lib/appData.json';
import Img from '@/app/ui/image';
import Logout from './logout';
import styles from '@/app/assets/css/Footer.module.css';

export default function Footer() {
  const yr = new Date().getFullYear();
  const { paymentArr, paymentImgWidths } = data;

  return (
    <footer className={styles.container}>
      <div className={styles.ak}>
        © {yr}
        <a
          href="https://github.com/AgeBK/ak-fine-wine-ts?tab=readme-ov-file#about"
          target="_blank"
        >
          AK Fine Wines
        </a>
        All rights reserved.
        <div>
          <Logout />
          <span className={styles.manage}>
            <Link href="/manage">Manage</Link>
          </span>
        </div>
      </div>
      <ul className={styles.list}>
        {paymentArr.map((val, ind) => (
          <li key={ind}>
            <Img
              imgSrc={`payment/${val}.webp`}
              imgAlt={val}
              imgWidth={paymentImgWidths[ind]}
              imgHeight={44}
            />
          </li>
        ))}
      </ul>
    </footer>
  );
}
