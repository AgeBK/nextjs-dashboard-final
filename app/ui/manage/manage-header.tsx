import React from 'react';
// import styles from '@/app/assets/css/category/CategoryList.module.css';
import styles from '@/app/assets/css/manage/ManageProducts.module.css';

export default function ManageHeader() {
  // column names on main manage page
  return (
    <header className={styles.row}>
      <div className={styles.col}>Id</div>
      <div className={styles.col}>Name</div>
      <div className={`${styles.col} ${styles.brand}`}>Brand</div>
      <div className={`${styles.col} ${styles.category}`}>Category</div>
      <div className={`${styles.col} ${styles.variety}`}>Variety</div>
      <div className={`${styles.col} ${styles.price}`}>Price</div>
      <div className={styles.col}></div>
    </header>
  );
}
