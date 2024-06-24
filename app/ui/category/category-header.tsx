import { FilterProps } from '@/app/lib/definitions';
import Pills from '@/app/ui/pills';
import Sort from '@/app/ui/sort';
import styles from '@/app/_assets/css/category/CategoryHeader.module.css';

type CategoryHeaderProps = {
  filters: FilterProps;
  removeFilters: (name: string) => void;
  dataLength: number;
  sortName: string;
  setSortName: (name: string) => void;
};

const CategoryHeader = ({
  filters,
  removeFilters,
  dataLength,
  sortName,
  setSortName,
}: CategoryHeaderProps) => {
  return (
    <div className={styles.detailsCont}>
      <Pills filters={filters} removeFilters={removeFilters} />
      <span className={styles.results}>({dataLength}) Available</span>
      <div className={styles.sort}>Sort:</div>
      <Sort sortName={sortName} setSortName={setSortName} />
    </div>
  );
};

export default CategoryHeader;
