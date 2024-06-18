import WineBlurb from "@/app/ui/wine-blurb";
import ProductRating from "@/app/ui/product-rating";
import ProductCart from "@/app/ui/product-cart";
import Img from "@/app/ui/image";
import styles from "@/app/_assets/css/ProductDetails.module.css";

type ProductDetailsProps = {
  id: string;
  name: string;
  brand: string;
  shortName: string;
  average: number;
  total: number;
  twoFor: number;
  tenFor: number;
  percentOff: number;
  current: number;
  packaging: string;
  calloutText?: string;
  discountCode?: string;
  urlCategory?: string;
  urlVariety?: string;
  // isSmallScreen: boolean; // TODO:??
};

const ProductDetails = ({
  id,
  brand,
  name,
  shortName,
  average,
  total,
  twoFor,
  tenFor,
  percentOff,
  current,
  packaging,
  calloutText,
  discountCode,
  urlCategory,
  urlVariety,
}: // isSmallScreen,
ProductDetailsProps) => {
  const isBottle = packaging === "Bottle";

  return (
    <section className={styles.productCont}>
      <div className={styles.productImg}>
        <Img
          imageSrc={`wine/${id}.jpg`}
          imageStyle={
            packaging === "Bottle" ? "productMain" : "productMainCask"
          }
          imageAlt={name}
          imageWidth={isBottle ? 120 : 339}
          imageHeight={520}
        />
      </div>
      <div className={styles.productMeta}>
        <h1 className={styles.brand}>{brand}</h1>
        <h2 className={styles.shortName}>{shortName}</h2>
        <WineBlurb urlCategory={urlCategory} urlVariety={urlVariety} />
        <ProductRating average={average} total={total} />
        {/* {!isSmallScreen && ( */}
        <ProductCart
          id={id}
          name={name}
          brand={brand}
          shortName={shortName}
          twoFor={twoFor}
          tenFor={tenFor}
          percentOff={percentOff}
          current={current}
          packaging={packaging}
          calloutText={calloutText}
          discountCode={discountCode}
        />
        {/* )} */}
      </div>
    </section>
  );
};

export default ProductDetails;
