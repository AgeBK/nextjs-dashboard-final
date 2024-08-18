import { Suspense } from 'react';
import Carousel from '../ui/carousel/carousel-main';
import HomeHero from '../ui/home-hero';
import HomeCampaign from '../ui/home-campaign';
import Loading from '../ui/loading';
import HomeCampaignMini from '../ui/home-campaign-mini';
import styles from '@/app/assets/css/Home.module.css';

export default function Page() {
  return (
    <article>
      <HomeHero />
      <h2 className={styles.topOffers}>Top offers of the week</h2>
      <Suspense fallback={<Loading />}>
        <Carousel />
      </Suspense>
      <HomeCampaign
        link="ten-percent-off"
        hdr="10% OFF"
        text="Huge range of selected wines"
        finePrint="(Ends Sunday, 5pm)"
      />
      <HomeCampaignMini />
      <HomeCampaign
        link="price-drop"
        hdr="WEEKLY SPECIALS"
        text="100's of discounted wines"
        finePrint="(Ends Sunday, 5pm)"
      />
    </article>
  );
}
