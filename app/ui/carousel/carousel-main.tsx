import Carousel from './carousel';
import { fetchCarouselData } from '@/app/lib/utils';

export default async function CarouselMain({ variety }: { variety?: string }) {
  // loading carousel data here and passing to client component
  const carouselProducts = await fetchCarouselData(variety || undefined);

  return <Carousel arr={carouselProducts} />;
}
