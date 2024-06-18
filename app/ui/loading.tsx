import styles from "@/app/_assets/css/Loading.module.css";
// loading.tsx is a special Next.js file built on top of Suspense
// it allows you to create fallback UI to show as a replacement while page content loads.

const Loading = () => (
  <div className={styles.loaderCont}>
    <div className={styles.loader}></div>
  </div>
);

export default Loading;
