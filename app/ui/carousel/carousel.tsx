"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import ProductItem from "@/app/ui/product/product-item";
import CarouselPaging from "@/app/ui/carousel/carousel-paging";
import {Button} from "@/app/ui/button";
import Img from "@/app/ui/image";
import {
  SIX_CAROUSEL_ITEMS,
  FOUR_CAROUSEL_ITEMS,
  THREE_CAROUSEL_ITEMS,
  TWO_CAROUSEL_ITEMS,
  ONE_CAROUSEL_ITEM,
} from "@/app/lib/appData.json";
import { DataProps } from "../../lib/definitions";
import styles from "@/app/_assets/css/Carousel.module.css";

export default function Carousel({ arr }: { arr: DataProps[] }) {
  // console.log("Carousel");
  // console.log(arr);

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [items, setItems] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const totalPages: number = arr && arr.length / items - 1;

  const handleClick = (val: number): void =>
    setPageIndex((prev: number) => prev + val);

  const calculateItems = useCallback((): void => {
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
      } else if (offsetWidth >= 380) {
        currentItems = TWO_CAROUSEL_ITEMS;
      } else {
        currentItems = ONE_CAROUSEL_ITEM;
      }
      if (currentItems !== items) setItems(currentItems);
    }
  }, [items]);

  useEffect(() => {
    calculateItems();
    if (window) {
      window.addEventListener("resize", calculateItems);
      return () => window.removeEventListener("resize", calculateItems);
    }
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
              imageSrc={`icons/arrowLeft.png`}
              imageStyle="carousel"
              imageAlt="previous"
              imageHeight={30}
              imageWidth={30}
            />
          </Button>
        </div>
        {arr.map(
          (
            {
              id,
              category,
              variety,
              name,
              short_name,
              brand,
              packaging,
              ratings_average,
              price_normal,
              price_ten_for,
              price_two_for,
              price_current,
              price_percent_off,
              promotion_callout_text,
              promotion_discount_code,
            },
            ind
          ) => {
            if (ind >= pageIndex * items && ind < pageIndex * items + items) {
              return (
                <ProductItem
                  props={{
                    id,
                    category,
                    variety,
                    name,
                    short_name,
                    brand,
                    packaging,
                    ratings_average,
                    price_normal,
                    price_ten_for,
                    price_two_for,
                    price_current,
                    price_percent_off,
                    promotion_callout_text,
                    promotion_discount_code,
                  }}
                  key={id}
                  css={"carouselItems" + items}
                />
              );
            }

            return null;
          }
        )}
        <div className={`${styles.arrow} ${styles.arrowRight}`}>
          <Button
            css="carousel"
            onClick={() => handleClick(1)}
            disabled={pageIndex >= totalPages}
          >
            <Img
              imageSrc={`icons/arrowRight.png`}
              imageStyle="carousel"
              imageAlt="next"
              imageHeight={30}
              imageWidth={30}
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
