import { Suspense } from 'react';
import Carousel from './carousel';
import Loading from '../loading';
import {
  fetchCarouselProducts,
  fetchCarouselProductsByVariety,
} from '@/app/lib/data';
import { DataProps } from '@/app/lib/definitions';
import { capitalizeFirstLetter } from '@/app/lib/utils';

export default async function CarouselMain({ variety }: { variety?: string }) {
  console.log('CarouselMain');
  console.log(variety);

  // TODO: test for error
  let products: DataProps[] = [];
  if (variety) {
    products = await fetchCarouselProductsByVariety(
      capitalizeFirstLetter(variety),
    );
  } else {
    products = await fetchCarouselProducts();
  }

  if (products.length) {
    return (
      <Suspense fallback={<Loading />}>
        <Carousel arr={products} />
      </Suspense>
    );
  }
  return null;
}
