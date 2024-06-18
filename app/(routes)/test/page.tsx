import Img from "@/app/ui/image";
import { paymentArr } from "@/app/lib/appData.json";
import styles from "@/app/_assets/css/Test.module.css";

function Test() {
  const yr = new Date().getFullYear();
  const arr: string[] = paymentArr;

  return (
    <article className={styles.container}>
      <h1>Test</h1>
      <div className={styles.ak}>
        © {yr}{" "}
        <a
          href="https://github.com/AgeBK/ak-fine-wine-ts?tab=readme-ov-file#about"
          target="_blank"
        >
          AK Fine Wines
        </a>{" "}
        All rights reserved.
      </div>
      <ul className={styles.list}>
        {arr.map((val, ind) => (
          <li key={ind}>
            <Img
              imageSrc={`payment/${val}.jpg`}
              imageStyle="footer"
              imageAlt={val}
              imageWidth={48}
              imageHeight={44}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}

export default Test;
