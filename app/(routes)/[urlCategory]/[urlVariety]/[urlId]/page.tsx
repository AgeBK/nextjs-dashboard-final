import React from 'react';
import { fetchProductById } from '@/app/lib/data';
import BreadCrumb from '@/app/ui/bread-crumb';
import ProductCart from '@/app/ui/product/product-cart';
import ProductDetails from '@/app/ui/product/product-details';
import ProductInfo from '@/app/ui/product/product-info';
import ProductReview from '@/app/ui/product/product-review';
import CarouselMain from '@/app/ui/carousel/carousel-main';
import styles from '@/app/assets/css/product/Product.module.css';

export default async function Product({
  params: { urlCategory, urlVariety, urlId },
}: {
  params: { urlCategory: string; urlVariety: string; urlId: string };
}) {
  const product = await fetchProductById(urlId);

  if (product) {
    const {
      id,
      category,
      variety,
      name,
      short_name,
      brand,
      packaging,
      ratings_average,
      ratings_total,
      price_normal,
      price_ten_for,
      price_two_for,
      price_current,
      price_percent_off,
      promotion_callout_text,
      promotion_discount_code,
      unit_of_measure_label,
    } = product;

    const isCask = packaging === 'Cask';

    return (
      <article>
        <div className={styles.container}>
          <BreadCrumb
            urlCategory={urlCategory}
            urlVariety={urlVariety}
            category={category}
            variety={variety}
          />
          <ProductDetails
            id={id}
            name={name}
            short_name={short_name}
            brand={brand}
            packaging={packaging}
            price_current={price_current}
            price_two_for={price_two_for}
            price_ten_for={price_ten_for}
            price_percent_off={price_percent_off}
            promotion_callout_text={promotion_callout_text}
            promotion_discount_code={promotion_discount_code}
            average={ratings_average}
            total={ratings_total}
            urlCategory={urlCategory}
            urlVariety={urlVariety}
            isCask={isCask}
          />
          <div className={styles.cartCont}>
            <ProductCart
              id={id}
              name={name}
              brand={brand}
              short_name={short_name}
              price_current={price_current}
              price_two_for={price_two_for}
              price_ten_for={price_ten_for}
              price_percent_off={price_percent_off}
              packaging={packaging}
              promotion_callout_text={promotion_callout_text}
              promotion_discount_code={promotion_discount_code}
              isCask={isCask}
            />
          </div>
          <ProductInfo
            id={id}
            category={category}
            variety={variety}
            brand={brand}
            packaging={packaging}
            unitOfMeasureLabel={unit_of_measure_label}
            current={price_current}
            normal={price_normal}
            short_name={short_name}
            urlCategory={urlCategory}
          />
          <ProductReview urlCategory={urlCategory} variety={variety} />
          <section className={styles.similar}>
            <h2>Similar Products:</h2>
            <CarouselMain variety={variety} />
          </section>
        </div>
      </article>
    );
  }
  return null;
}
