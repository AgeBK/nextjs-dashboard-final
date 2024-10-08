'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { DataProps } from '../../lib/definitions';
import ProductItem from '@/app/ui/product/product-item';
import CarouselPaging from '@/app/ui/carousel/carousel-paging';
import Button from '@/app/ui/button';
import Img from '@/app/ui/image';
import data from '@/app/lib/appData.json';
import styles from '@/app/assets/css/carousel/Carousel.module.css';

export default function Carousel({ arr }: { arr: DataProps[] }) {
  const {
    SIX_CAROUSEL_ITEMS,
    FOUR_CAROUSEL_ITEMS,
    THREE_CAROUSEL_ITEMS,
    TWO_CAROUSEL_ITEMS,
  } = data;

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [items, setItems] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const totalPages: number = arr && arr.length / items - 1;

  const handleClick = (val: number): void =>
    setPageIndex((prev: number) => prev + val);

  const calculateItems = useCallback((): void => {
    // calculates the number of carousel items to display based on width of screen
    if (ref.current && ref.current.offsetWidth) {
      const {
        current: { offsetWidth },
      } = ref;

      let currentItems: number = 0;
      if (offsetWidth >= 1200) {
        currentItems = SIX_CAROUSEL_ITEMS;
      } else if (offsetWidth >= 875) {
        currentItems = FOUR_CAROUSEL_ITEMS;
      } else if (offsetWidth >= 650) {
        currentItems = THREE_CAROUSEL_ITEMS;
      } else {
        currentItems = TWO_CAROUSEL_ITEMS;
      }
      if (currentItems !== items) setItems(currentItems);
    }
  }, [
    items,
    SIX_CAROUSEL_ITEMS,
    FOUR_CAROUSEL_ITEMS,
    THREE_CAROUSEL_ITEMS,
    TWO_CAROUSEL_ITEMS,
  ]);

  useEffect(() => {
    calculateItems();
    if (window) {
      window.addEventListener('resize', calculateItems);
      return () => window.removeEventListener('resize', calculateItems);
    }
    return undefined;
  }, [calculateItems]);

  return (
    <>
      <div className={styles.carousel} ref={ref}>
        <div className={`${styles.arrow} ${styles.arrowLeft}`}>
          <Button
            css="carousel"
            onClick={() => handleClick(-1)}
            disabled={pageIndex <= 0}
          >
            <Img
              imgSrc={`icons/arrowLeft.png`}
              imgAlt="previous"
              imgHeight={30}
              imgWidth={30}
            />
          </Button>
        </div>
        {arr?.map(
          (
            {
              id,
              category,
              variety,
              name,
              shortName,
              brand,
              packaging,
              ratingsAverage,
              priceNormal,
              priceTenFor,
              priceTwoFor,
              priceCurrent,
              pricePercentOff,
              promotionCalloutText,
              promotionDiscountCode,
            },
            ind,
          ) => {
            if (ind >= pageIndex * items && ind < pageIndex * items + items) {
              return (
                <ProductItem
                  props={{
                    id,
                    category,
                    variety,
                    name,
                    shortName,
                    brand,
                    packaging,
                    ratingsAverage,
                    priceNormal,
                    priceTenFor,
                    priceTwoFor,
                    priceCurrent,
                    pricePercentOff,
                    promotionCalloutText,
                    promotionDiscountCode,
                  }}
                  key={id}
                  ind={ind}
                  css={'productCarousel'}
                />
              );
            }

            return null;
          },
        )}
        <div className={`${styles.arrow} ${styles.arrowRight}`}>
          <Button
            css="carousel"
            onClick={() => handleClick(1)}
            disabled={pageIndex >= totalPages}
          >
            <Img
              imgSrc={`icons/arrowRight.png`}
              imgAlt="next"
              imgHeight={30}
              imgWidth={30}
            />
          </Button>
        </div>
      </div>
      <CarouselPaging
        items={items}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        handleClick={handleClick}
      />
    </>
  );
}
