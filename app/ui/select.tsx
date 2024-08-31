import React from 'react';
import { SelectListsProps } from '../lib/definitions';
import styles from '@/app/assets/css/Select.module.css';

const SelectLists = ({ arr, key, value, handleChange }: SelectListsProps) => {
  // TODO: lighthouse again
  return (
    <section className={styles.container}>
      <label htmlFor="sort">
        <select
          id="sort"
          name={key}
          onChange={() => handleChange(key, value)}
          className={styles.select}
          value={value}
        >
          {arr.map((val: string) => (
            <option value={val.toLowerCase()} key={val}>
              {val}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
};

export default SelectLists;
