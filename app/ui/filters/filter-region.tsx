import { ChangeEvent } from 'react';
import { KeyNumberProps, RegionFilterProps } from '@/app/lib/definitions';
import { filterCategoryPageData } from '@/app/lib/utils';
import styles from '@/app/assets/css/filter/FilterRegion.module.css';

export default function FilterRegion({
  updateFilters,
  filters,
  currentData,
}: RegionFilterProps) {
  const filteredData = filterCategoryPageData(currentData, filters);

  // display different wine regions and the number of each available
  const currentRegions: KeyNumberProps = filteredData.reduce((acc, val) => {
    const r: string = val.region as string;
    if (!acc[r]) acc = { ...acc, [r]: 0 };
    acc[r] += 1;
    return acc;
  }, {} as KeyNumberProps);

  const sortedArr = Object.entries(currentRegions).sort(
    ([, a], [, b]) => b - a,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    updateFilters({
      ...filters,
      region: { ...filters.region, [value]: checked },
    });
  };

  return (
    <>
      <h3 className={styles.hdr}>Region:</h3>
      {sortedArr.length > 0 ? (
        <ul>
          {sortedArr.map(([reg, amount]) => (
            <li key={reg}>
              <input
                type="checkbox"
                id={reg}
                name="region"
                value={reg}
                checked={(filters.region && filters.region[reg]) || false}
                className={styles.radio}
                onChange={handleChange}
              />
              <label htmlFor={reg}>
                {reg} <span className={styles.amount}>({amount})</span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResults}>No results</div>
      )}
    </>
  );
}
