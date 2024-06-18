import { ChangeEvent } from "react";
import { sortNameArr } from "@/app/lib/appData.json";
import styles from "@/app/_assets/css/Sort.module.css";

type SortProps = {
  sortName: string;
  setSortName: (name: string) => void;
};

function Sort({ sortName, setSortName }: SortProps) {
  const handleSelect = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => setSortName(value);

  return (
    <div className={styles.container}>
      <label htmlFor="sort" id="lblSort">
        <select
          id="sort"
          name="filters"
          onChange={(e) => handleSelect(e)}
          className={styles.select}
          aria-labelledby="lblSort"
          value={sortName}
        >
          {sortNameArr.map((val: string) => (
            <option value={val.toLowerCase()} key={val}>
              {val}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Sort;
