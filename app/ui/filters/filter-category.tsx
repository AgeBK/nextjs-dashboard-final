import { ChangeEvent } from 'react';
import { WineFilterProps } from '@/app/lib/definitions';
import data from '@/app/lib/appData.json';
import styles from '@/app/assets/css/filter/FilterCategory.module.css';

// used in manage page
export default function FilterCategory({
  updateFilters,
  filters,
}: WineFilterProps) {
  const { categoryArr } = data;

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    updateFilters({ category: value });

  return (
    <>
      <h3 className={styles.hdr}>Category:</h3>
      <ul>
        {categoryArr.map((value) => (
          <li key={value}>
            <input
              type="radio"
              id={value}
              name="category"
              value={value}
              checked={filters.category === value}
              onChange={handleChange}
              className={styles.radio}
            />
            <label htmlFor={value} className={styles.label}>
              {value}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
