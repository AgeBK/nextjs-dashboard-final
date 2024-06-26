import { Suspense } from 'react';
import Carousel from './carousel';
import Loading from '../loading';
import { fetchCarouselProducts } from '@/app/lib/data';
import { DataProps } from '@/app/lib/definitions';

export default async function CarouselMain() {
  let products: DataProps[] = await fetchCarouselProducts(); // TODO: test for error

  if (products.length) {
    return (
      <Suspense fallback={<Loading />}>
        <Carousel arr={products} />
      </Suspense>
    );
  }
  return null;
}
