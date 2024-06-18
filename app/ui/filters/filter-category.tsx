import { ChangeEvent } from 'react';
import { categoryArr } from '@/app/lib/appData.json';
import { WineFilterProps, TextValueArrProps } from '@/app/lib/definitions';
import styles from '@/app/_assets/css/FilterCategory.module.css';

const CategoryFilter = ({ updateFilters, filters }: WineFilterProps) => {
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    updateFilters({ category: value });
  const arr = categoryArr;

  return (
    <>
      <h3 className={styles.hdr}>Category:</h3>
      <ul role="radiogroup">
        {arr.map((value) => (
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
};

export default CategoryFilter;
