import ProductItem from '@/app/ui/product/product-item';
import ManageProducts from '../manage/manage-products';
import ManageHeader from '../manage/manage-header';
import { CategoryListProps } from '@/app/lib/definitions';
import styles from '@/app/_assets/css/category/CategoryList.module.css';
import Loading from '../loading';

export default function CategoryList({ arr, isManage }: CategoryListProps) {
  const style = isManage ? 'table' : 'categoryList';
  const JSX = isManage ? ManageProducts : ProductItem;

  return arr.length > 0 ? (
    <div className={styles[style]}>
      {isManage && <ManageHeader />}
      {arr.map((val, ind) => (
        <JSX props={val} key={ind} ind={ind} />
      ))}
    </div>
  ) : (
    <Loading />
  );
}
