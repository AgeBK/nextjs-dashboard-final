import { Suspense } from 'react'; // TODO: look into this for loading
import ProductItem from '@/app/ui/product/product-item';
import ManageProducts from '../manage/manage-products';
import ManageHeader from '../manage/manage-header';
import { DataProps } from '@/app/lib/definitions';
import styles from '@/app/_assets/css/CategoryList.module.css';
import Loading from '../loading';

type CategoryListProps = {
  arr: DataProps[];
  isManage?: boolean;
};

export default function CategoryList({ arr, isManage }: CategoryListProps) {
  const style = isManage ? 'table' : 'categoryList';
  const JSX = isManage ? ManageProducts : ProductItem;

  return arr.length > 0 ? (
    <div className={styles[style]}>
      {isManage && <ManageHeader />}
      {arr.map((val, ind) => (
        <JSX props={val} key={ind} />
      ))}
    </div>
  ) : (
    <Loading />
  );
}
