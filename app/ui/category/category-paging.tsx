import CategoryPageNumber from '@/app/ui/category/category-page-number';
import ResultsPP from '@/app/ui/resultspp';
import styles from '@/app/_assets/css/category/CategoryPaging.module.css';
import { DataProps, PagingProps } from '@/app/lib/definitions';

type CategoryPagingProps = {
  currentData: DataProps[];
  paging: PagingProps;
  updatePaging: (paging: PagingProps) => void;
};

const CategoryPaging = ({
  currentData,
  paging,
  updatePaging,
}: CategoryPagingProps) => {
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
};

export default CategoryPaging;
