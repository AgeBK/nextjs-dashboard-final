import Link from "next/link";
import Img from "@/app/ui/image";
import styles from "@/app/_assets/css/BreadCrumb.module.css";

type BreadCrumbProps = {
  urlCategory?: string;
  urlVariety?: string;
  category: string;
  variety: string;
};

const Chevron = () => (
  <span className={styles.chevronCont}>
    <span className={styles.chevron}></span>
    <span className={styles.chevron}></span>
  </span>
);

const BreadCrumb = ({
  urlCategory,
  urlVariety,
  category,
  variety,
}: BreadCrumbProps) => {
  console.log("bread crumb");
  console.log(urlCategory);

  return (
    <div className={styles.breadCrumb}>
      <Link href="/" className={styles.category}>
        <Img
          imageSrc={`icons/home.png`}
          imageStyle=""
          imageAlt="AK Fine Wines"
          imageWidth={17}
          imageHeight={14}
        />
        Home
      </Link>
      <Chevron />
      <Link href={`/${urlCategory}`} className={styles.category}>
        {category}
      </Link>
      <Chevron />
      <Link href={`/${urlCategory}/${urlVariety}`} className={styles.category}>
        {variety}
      </Link>
    </div>
  );
};

export default BreadCrumb;
