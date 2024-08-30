import { ChangeEvent } from 'react';
import { KeyNumberProps, VarietyFilterProps } from '@/app/lib/definitions';
import { filterCategoryPageData } from '@/app/lib/utils';
import Button from '../button';
import styles from '@/app/assets/css/filter/FilterVariety.module.css';

export default function FilterVariety({
  updateFilters,
  filters,
  currentData,
}: VarietyFilterProps) {
  const filteredData = filterCategoryPageData(currentData, filters);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    updateFilters({ variety: value });

  // display different wine varietys and the number of each available
  const varietys: KeyNumberProps = filteredData.reduce(
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
        <ul>
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
              {filters.variety === variety && (
                <span className={styles.remove}>
                  <Button
                    css="linkLight"
                    onClick={() => updateFilters({ variety: '' })}
                  >
                    Clear
                  </Button>
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResults}>No results</div>
      )}
    </>
  );
}
