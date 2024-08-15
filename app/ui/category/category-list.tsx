import ProductItem from '@/app/ui/product/product-item';
import ManageProducts from '../manage/manage-products';
import ManageHeader from '../manage/manage-header';
import { CategoryListProps } from '@/app/lib/definitions';
import styles from '@/app/assets/css/category/CategoryList.module.css';
import Loading from '../loading';

export default function CategoryList({ arr, isManage }: CategoryListProps) {
  // TODO: need to comment components
  // Loads product lists on Category page and Manage products page
  const style = isManage ? 'table' : 'categoryList';
  const JSX = isManage ? ManageProducts : ProductItem;

  //console.log('CategoryList');
  // console.log(arr);

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
