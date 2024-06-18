import React from "react";
import styles from "@/app/_assets/css/Select.module.css";

const SelectLists = ({ arr, key, value, handleChange }) => {
  return (
    <section className={styles.container}>
      <label htmlFor="sort" id="lblSort">
        <select
          id={key}
          name={key}
          onChange={() => handleChange(key, value)}
          className={styles.select}
          aria-labelledby="lblSort"
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
