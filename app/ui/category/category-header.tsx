import { CategoryHeaderProps } from '@/app/lib/definitions';
import Pills from '@/app/ui/pills';
import Sort from '@/app/ui/sort';
import styles from '@/app/assets/css/category/CategoryHeader.module.css';

export default function CategoryHeader({
  filters,
  removeFilters,
  dataLength,
  sortName,
  setSortName,
}: CategoryHeaderProps) {
  return (
    <div className={styles.detailsCont}>
      <Pills filters={filters} removeFilters={removeFilters} />
      <span className={styles.results}>({dataLength}) Available</span>
      <Sort sortName={sortName} setSortName={setSortName} />
    </div>
  );
}
