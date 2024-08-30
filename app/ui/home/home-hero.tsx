import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/assets/css/HomeHero.module.css';

export default function HomeHero() {
  // show landscape/portrait image based on screen width
  return (
    <>
      <h2 className={styles.slogan}>
        All of your fine wine needs at the best prices guaranteed!!
      </h2>
      <div className={styles.hero}>
        <Link href="/ten-for-100">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/assets/img/promotion/tenFor100Sml1.webp"
            />
            <Image
              src="/assets/img/promotion/tenFor100.webp"
              alt="Ten for $100"
              width={1400}
              height={420}
              className={styles.img}
              priority={true}
            />
          </picture>
        </Link>
      </div>
    </>
  );
}
