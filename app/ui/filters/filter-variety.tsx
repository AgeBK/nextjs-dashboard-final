import { ChangeEvent } from 'react';
import { WineFilterProps, KeyNumberProps } from '@/app/lib/definitions';
import styles from '@/app/_assets/css/filter/FilterVariety.module.css';

interface VarietyFilterProps extends WineFilterProps {
  currentData: { category: string; variety: string }[];
}

const VarietyFilter = ({
  updateFilters,
  filters,
  currentData,
}: VarietyFilterProps) => {
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    updateFilters({ variety: value });

  const varietys: KeyNumberProps = currentData.reduce(
    (acc, { category, variety }) => {
      if (!filters.category || filters.category === category)
        acc[variety] = (acc[variety] || 0) + 1;
      return acc;
    },
    {} as KeyNumberProps,
  );

  const sortedArr = Object.entries(varietys).sort(([, a], [, b]) => b - a);

  return (
    <>
      <h3 className={styles.hdr}>Variety:</h3>
      {sortedArr.length > 0 ? (
        <ul role="radiogroup">
          {sortedArr.map(([variety, amount]) => (
            <li key={variety}>
              <input
                type="radio"
                id={variety}
                name="variety"
                value={variety}
                checked={filters.variety === variety}
                className={styles.radio}
                onChange={handleChange}
              />
              <label htmlFor={variety}>
                {variety} <span className={styles.amount}> ({amount})</span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResults}>No results</div>
      )}
    </>
  );
};

export default VarietyFilter;
