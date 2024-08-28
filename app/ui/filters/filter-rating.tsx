import data from '@/app/lib/appData.json';
import { WineFilterProps, TextValueArrProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/filter/FilterRating.module.css';

export default function FilterRating({
  filters,
  updateFilters,
  isManage,
}: WineFilterProps) {
  const { ratingArr, ratingArrManage } = data;
  const arr: TextValueArrProps[] = isManage ? ratingArrManage : ratingArr;

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => updateFilters({ rating: value });

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
              aria-label={text}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
