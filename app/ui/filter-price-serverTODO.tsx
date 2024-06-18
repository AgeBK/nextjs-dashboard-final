import { ChangeEvent } from "react";
import styles from "@/app/_assets/css/FilterPriceServer.module.css";
import { priceArr } from "@/app/lib/appData.json";
import { WineFilterProps, TextValueArrProps } from "@/app/lib/definitions";

const FilterPriceServer = ({ updateFilters, filters }: WineFilterProps) => {
  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {};

  // updateFilters({ price: value });
  const arr: TextValueArrProps[] = priceArr;

  return (
    <>
      <h3 className={styles.hdr}>Price:</h3>
      <ul>
        {arr.map(({ text, value }) => (
          <li key={value}>
            <input
              type="radio"
              id={value}
              name="price"
              value={value}
              checked={filters.price === value}
              onChange={handleChange}
              className={styles.radio}
            />
            <label htmlFor={value} className={styles.label}>
              {text}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FilterPriceServer;
