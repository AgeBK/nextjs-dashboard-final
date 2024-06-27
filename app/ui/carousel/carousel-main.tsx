import { Suspense } from 'react';
import Carousel from './carousel';
import Loading from '../loading';
import { fetchCarouselData } from '@/app/lib/utils';

export default async function CarouselMain({ variety }: { variety?: string }) {
  // TODO: test for error
  const carouselProducts = await fetchCarouselData(variety || undefined);

  return (
    <Suspense fallback={<Loading />}>
      <Carousel arr={carouselProducts} />
    </Suspense>
  );
}
