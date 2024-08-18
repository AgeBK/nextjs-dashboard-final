import { CategoryPagingProps } from '@/app/lib/definitions';
import CategoryPageNumber from '@/app/ui/category/category-page-number';
import ResultsPP from '@/app/ui/resultspp';
import styles from '@/app/assets/css/category/CategoryPaging.module.css';

export default function CategoryPaging({
  currentData,
  paging,
  updatePaging,
}: CategoryPagingProps) {
  return (
    <div className={styles.categoryPaging}>
      <div className={styles.pageNumCont}>
        <CategoryPageNumber
          currentData={currentData}
          paging={paging}
          updatePaging={updatePaging}
        />
      </div>
      <ResultsPP paging={paging} updatePaging={updatePaging} />
    </div>
  );
}
