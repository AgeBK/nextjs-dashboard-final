import { CategoryListProps } from '@/app/lib/definitions';
import ProductItem from '@/app/ui/product/product-item';
import ManageProducts from '../manage/manage-products';
import ManageHeader from '../manage/manage-header';
import Loading from '../loading';
import styles from '@/app/assets/css/category/CategoryList.module.css';

export default function CategoryList({ arr, isManage }: CategoryListProps) {
  // TODO: need to comment components
  // TODO: console logs
  // Loads product lists on Category page and Manage products page
  // TODO: update readme

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
