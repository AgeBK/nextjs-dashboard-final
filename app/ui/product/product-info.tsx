import Link from 'next/link';
import { hyphenate } from '../../lib/utils';
import { ProductInfoProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/product/ProductInfo.module.css';

export default function ProductInfo({
  id,
  category,
  variety,
  brand,
  packaging,
  region,
  unitOfMeasureLabel,
  current,
  normal,
  shortName,
  urlCategory,
}: ProductInfoProps) {
  // detailed list of the products information
  return (
    <section className={styles.info}>
      <h2 className={styles.infoHdr}>Product Information:</h2>
      <ul>
        <li>
          <span>Category</span>
          <span>
            <Link href={`/${urlCategory}`}>{category}</Link>
          </span>
        </li>
        <li>
          <span>Style</span>
          <span>
            <Link href={`/${urlCategory}/${hyphenate(variety)}`}>
              {variety}
            </Link>
          </span>
        </li>
        <li>
          <span>Standard Drinks</span>
          <span>7.4</span>
        </li>
        <li>
          <span>Packaging</span>
          <span>{packaging}</span>
        </li>
        <li>
          <span>Alcohol Content</span>
          <span>11.7%</span>
        </li>
        <li>
          <span>Unit Measure</span>
          <span>{unitOfMeasureLabel}</span>
        </li>
        <li>
          <span>Closure</span>
          <span>{packaging === 'Bottle' ? 'Screw cap' : 'Self close'}</span>
        </li>
        <li>
          <span>On special</span>
          <span>{current !== normal ? 'Yes' : 'No'}</span>
        </li>
        <li>
          <span>Occasion</span>
          <span>Drinking :)</span>
        </li>
        <li>
          <span>Organic</span>
          <span>
            {shortName.toLowerCase().includes('organic') ? 'Yes' : 'No'}
          </span>
        </li>
        <li>
          <span>Food Pair</span>
          <span>{category === 'Red' ? 'Meat' : 'Chicken/Fish'}</span>
        </li>
        <li>
          <span>Region</span>
          <span>{region}</span>
        </li>
        <li>
          <span>Origin</span>
          <span>Australia</span>
        </li>
        <li>
          <span>Cellaring</span>
          <span>Drink now</span>
        </li>
        <li>
          <span>Product ID</span>
          <span>{id}</span>
        </li>
        <li>
          <span>Brand</span>
          <span>
            <Link href={`/brand=${hyphenate(brand)}`}>{brand}</Link>
          </span>
        </li>
      </ul>
    </section>
  );
}
