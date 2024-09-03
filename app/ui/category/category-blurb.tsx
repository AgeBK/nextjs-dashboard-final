'use client';

import { CategoryBlurbProps, KeyStringProps } from '@/app/lib/definitions';
import { deHyphenate, hyphenate } from '@/app/lib/utils';
import data from '@/app/lib/appData.json';
import styles from '@/app/assets/css/Blurb.module.css';

export default function CategoryBlurb({
  urlCategory,
  variety,
}: CategoryBlurbProps) {
  console.log('CategoryBlurb');
  console.log(urlCategory);
  console.log(variety);

  // displays heading/info about the wine or deal based on the URL on the category page
  const { blurb } = data;
  const synopsis: KeyStringProps = blurb;

  const hdr = variety || deHyphenate(decodeURIComponent(urlCategory)); // decodeURIComponent when searching

  const wineBlurb =
    (variety && synopsis[hyphenate(variety) as string]) || // some wines have a specific variety blurb (sub-category)
    synopsis[urlCategory] || // some have a general category blurb
    synopsis['generic']; // some have a generic blurb (2 for deals etc)

  return (
    <section className={styles.categoryBlurb}>
      <h2 className={styles.variety}>{hdr}</h2>
      <div className={styles.blurb}>{wineBlurb}</div>
    </section>
  );
}
