import { ChangeEvent } from 'react';
import { SortProps } from '../lib/definitions';
import data from '@/app/lib/appData.json';
import styles from '@/app/assets/css/Sort.module.css';

export default function Sort({ sortName, setSortName }: SortProps) {
  const { sortNameArr } = data;

  const handleSelect = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => setSortName(value);

  return (
    <div className={styles.container}>
      <label htmlFor="sort">Sort:</label>
      <select
        id="sort"
        name="filters"
        onChange={(e) => handleSelect(e)}
        className={styles.select}
        value={sortName}
      >
        {sortNameArr.map((val: string) => (
          <option value={val.toLowerCase()} key={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}
