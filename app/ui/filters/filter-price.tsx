import { ChangeEvent } from 'react';
import data from '@/app/lib/appData.json';
import { WineFilterProps, TextValueArrProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/filter/FilterPrice.module.css';

export default function FilterPrice({
  updateFilters,
  filters,
}: WineFilterProps) {
  const { priceArr } = data;

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    updateFilters({ price: value });
  const arr: TextValueArrProps[] = priceArr;

  return (
    <>
      <h3 className={styles.hdr}>Price:</h3>
      <ul role="radiogroup">
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
