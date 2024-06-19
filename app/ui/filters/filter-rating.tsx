import data from '@/app/lib/appData.json';
import { WineFilterProps, TextValueArrProps } from '@/app/lib/definitions';
import styles from '@/app/_assets/css/FilterRating.module.css';

const FilterRating = ({
  filters,
  updateFilters,
  isManage,
}: WineFilterProps) => {
  const { ratingArr, ratingArrManage } = data;
  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => updateFilters({ rating: value });

  const arr: TextValueArrProps[] = isManage ? ratingArrManage : ratingArr;

  return (
    <>
      <h3 className={styles.hdr}>Rating:</h3>
      <ul role="radiogroup">
        {arr.map(({ text, value }) => (
          <li key={value}>
            <input
              type="radio"
              id={`rating${value}`}
              name="rating"
              value={value}
              checked={filters.rating === value}
              className={styles.radio}
              onChange={handleChange}
            />
            <label
              htmlFor={`rating${value}`}
              className={`${styles[`rating${value}`]} ${styles.rating} ${
                isManage && styles.ratingManage
              }`}
            >
              {text}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FilterRating;
