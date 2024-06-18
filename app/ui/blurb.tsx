import { memo } from "react"; // TODO:
import { KeyStringProps } from "@/app/lib/definitions";
import { blurb } from "@/app/lib/appData.json";
import { deHyphenate } from "@/app/lib/utils";
import styles from "@/app/_assets/css/Blurb.module.css";

type BlurbProps = {
  urlCategory: string;
  variety?: string;
};

export const Blurb = ({ urlCategory, variety }: BlurbProps) => {
  const synopsis: KeyStringProps = blurb;
  // use header provided (custom header) or just dehypenate URL params
  const hdr =
    // header ||
    (variety && deHyphenate(variety)) ||
    deHyphenate(decodeURIComponent(urlCategory));

  const wineBlurb =
    (variety && synopsis[variety]) || // some wines have a specific variety blurb (sub-category)
    synopsis[urlCategory] || // some have a specific category blurb
    synopsis["generic"]; // some have a generic blurb

  return (
    <section className={styles.categoryBlurb}>
      <h2 className={styles.variety}>{hdr}</h2>
      <div className={styles.blurb}>{wineBlurb}</div>
    </section>
  );
};
