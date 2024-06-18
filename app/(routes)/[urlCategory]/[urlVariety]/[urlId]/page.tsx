import React from "react";
import {
  fetchProductsById,
  fetchCarouselProductsByVariety,
} from "@/app/lib/data";
import BreadCrumb from "@/app/ui/bread-crumb";
import ProductCart from "@/app/ui/product-cart";
import ProductDetails from "@/app/ui/product-details";
import ProductInfo from "@/app/ui/product/product-info";
import ProductReview from "@/app/ui/product-review";
import styles from "@/app/_assets/css/Product.module.css";
import Carousel from "@/app/ui/carousel/carousel";
import { capitalizeFirstLetter } from "@/app/lib/utils";
import { DataProps } from "@/app/lib/definitions";

export default async function Product({
  params: { urlCategory, urlVariety, urlId },
}: {
  params: { urlCategory: string; urlVariety: string; urlId: string };
}) {
  const product = await fetchProductsById(urlId);
  let carouselProducts: DataProps[] = await fetchCarouselProductsByVariety(
    capitalizeFirstLetter(urlVariety)
  );

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

    return (
      <article>
        <div className={styles.container}>
          <h1>Product</h1>

          <BreadCrumb
            urlCategory={urlCategory}
            urlVariety={urlVariety}
            category={category}
            variety={variety}
          />
          <ProductDetails
            id={id}
            name={name}
            shortName={short_name}
            brand={brand}
            packaging={packaging}
            current={price_current}
            twoFor={price_two_for}
            tenFor={price_ten_for}
            percentOff={price_percent_off}
            calloutText={promotion_callout_text}
            discountCode={promotion_discount_code}
            average={ratings_average}
            total={ratings_total}
            urlCategory={urlCategory}
            urlVariety={urlVariety}
            // isSmallScreen={isSmallScreen}
          />
          {/* <ProductCart
            id={id}
            name={name}
            brand={brand}
            shortName={short_name}
            packaging={packaging}
            current={price_current}
            twoFor={price_two_for}
            tenFor={price_ten_for}
            percentOff={price_percent_off}
            calloutText={promotion_callout_text}
            discountCode={promotion_discount_code}
          /> */}

          <ProductInfo
            id={id}
            category={category}
            variety={variety}
            brand={brand}
            packaging={packaging}
            unitOfMeasureLabel={unit_of_measure_label}
            current={price_current}
            normal={price_normal}
            shortName={short_name}
            urlCategory={urlCategory}
          />
          <ProductReview urlCategory={urlCategory} variety={variety} />
          <section className={styles.similar}>
            <h2>Similar Products:</h2>
            <Carousel arr={carouselProducts} />
          </section>
        </div>
      </article>
    );
  }
  return null;
}
