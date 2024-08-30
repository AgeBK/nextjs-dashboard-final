import { ChangeEvent } from 'react';
import { WineFilterProps, TextValueArrProps } from '@/app/lib/definitions';
import data from '@/app/lib/appData.json';
import styles from '@/app/assets/css/filter/FilterPrice.module.css';

export default function FilterPrice({
  updateFilters,
  filters,
}: WineFilterProps) {
  const { priceArr } = data;
  const arr: TextValueArrProps[] = priceArr;

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    updateFilters({ price: value });

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
}
