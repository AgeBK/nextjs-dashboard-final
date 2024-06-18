import styles from "@/app/_assets/css/Price.module.css";

type PriceProps = {
  current: number;
  normal: number;
};

function Price({ current, normal }: PriceProps) {
  return (
    <>
      {normal && current !== normal && (
        <span className={styles.normal}>${normal}</span>
      )}
      <span className={styles.current}>${current}</span>
    </>
  );
}

export default Price;
