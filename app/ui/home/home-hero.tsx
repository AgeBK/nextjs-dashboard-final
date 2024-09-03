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
      <h3 className={styles.eos}>
        ENDS SUNDAY<span className={styles.divider}>|</span>
        ONLINE ONLY
      </h3>
      <div className={styles.hero}>
        <Link href="/ten-for-100">
          <picture>
            <source
              media="(max-width: 500px)"
              srcSet="/assets/img/promotion/heroSml.webp"
            />
            <Image
              src="/assets/img/promotion/hero.webp"
              alt="Ten for $100"
              width={1400}
              height={381}
              className={styles.img}
              priority={true}
            />
          </picture>
          <div className={styles.shopNow}>SHOP NOW</div>
        </Link>
      </div>
    </>
  );
}
