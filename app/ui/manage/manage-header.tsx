import React from 'react';
import styles from '@/app/_assets/css/CategoryList.module.css';

export default function ManageHeader() {
  return (
    <header className={styles.row}>
      <div className={styles.col}>Id</div>
      <div className={styles.col}>Name</div>
      <div className={styles.col}>Brand</div>
      <div className={styles.col}>Category</div>
      <div className={styles.col}>Variety</div>
      <div className={styles.col}>Price</div>
      <div className={styles.col}></div>
    </header>
  );
}
