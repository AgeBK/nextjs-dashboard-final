import Link from 'next/link';
import Img from '../ui/image';
import Carousel from '../ui/carousel/carousel';
import HomeHero from '../ui/home-hero';
import { Suspense } from 'react';
import Loading from '../ui/loading';
import { fetchCarouselProducts } from '../lib/data';
import { CampainMiniProps, DataProps } from '../lib/definitions';
import { campaingMini } from '../lib/appData.json';
import styles from './page.module.css';

import usePageWidth from '../hooks/usePageWidth';
import useSize from '../hooks/useSetPath';
import Image from 'next/image';

export default async function Home() {
  console.log('Home');
  // console.log(usePageWidth);
  // console.log(useSize);
  // const windowsize = useSize();
  // const isSmallScreen: boolean = usePageWidth(500);
  let products: DataProps[] = await fetchCarouselProducts();
  if (products.length) {
    return (
      <article>
        <h2 className={styles.slogan}>
          All of your fine wine needs at the best prices guaranteed!!
        </h2>
        <HomeHero />
        <h2 className={styles.topOffers}>Top offers of the week</h2>
        <Suspense fallback={<Loading />}>
          <Carousel arr={products} />
        </Suspense>
        {/* <Carousel /> */}
        <div className={styles.campaign}>
          <Link href="/ten-percent-off">
            <h2 className={styles.tenOff}>10% OFF</h2>
            <h2 className={styles.selected}>Huge range of selected wines</h2>
            <h2 className={styles.shopNow}>SHOP NOW</h2>
            <div className={styles.finePrint}>(Ends Sunday, 5pm)</div>
          </Link>
        </div>
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
                    imageSrc={imgSrc}
                    imageStyle="campaignMini"
                    imageAlt={imgAlt}
                    imageWidth={227}
                    imageHeight={150}
                  />
                  <h3 className={styles.shopNow}>SHOP NOW</h3>
                </Link>
              </div>
            ),
          )}
        </div>
        <div className={styles.campaign}>
          <Link href="/price-drop">
            <h2 className={styles.tenOff}>WEEKLY SPECIALS</h2>
            <h2 className={styles.selected}>100&apos;s of discounted wines</h2>
            <h2 className={styles.shopNow}>SHOP NOW</h2>
            <div className={styles.finePrint}>(Ends Sunday, 5pm)</div>
          </Link>
        </div>
      </article>
    );
  }
  return <Loading />; // TODO: ??
}
