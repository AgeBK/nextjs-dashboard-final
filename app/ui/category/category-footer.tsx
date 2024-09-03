import { CategoryFooterProps } from '@/app/lib/definitions';
import CategoryPaging from '@/app/ui/category/category-paging';
import ResultsPP from '@/app/ui/resultspp';
import styles from '@/app/assets/css/category/CategoryFooter.module.css';

export default function CategoryFooter({
  currentData,
  paging,
  updatePaging,
}: CategoryFooterProps) {
  return (
    <div className={styles.CategoryFooter}>
      <div className={styles.pageNumCont}>
        <CategoryPaging
          currentData={currentData}
          paging={paging}
          updatePaging={updatePaging}
        />
      </div>
      <ResultsPP paging={paging} updatePaging={updatePaging} />
    </div>
  );
}
