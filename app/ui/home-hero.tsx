import Image from "next/image";
import Link from "next/link";
import styles from "@/app/_assets/css/HomeHero.module.css";

export default function HomeHero() {
  return (
    <div className={styles.hero}>
      <Link href="/ten-for-100">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/assets/img/promotion/tenFor100Sml1.jpg"
          />
          <Image
            src="/assets/img/promotion/tenFor100.jpg" // Default image
            alt="Ten for $100"
            width={1400}
            height={420}
            layout="responsive"
          />
        </picture>
      </Link>
    </div>
  );
}
