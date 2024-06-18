import { Suspense } from 'react';
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
  console.log('CategoryList');
  console.log(isManage);
  const style = isManage ? 'table' : 'categoryList';

  // TODO: destructrued in props, then redestructure in ManageItem ?? just pass arr
  return arr.length > 0 ? (
    <div className={styles[style]}>
      {isManage && <ManageHeader />}
      {arr.map(
        ({
          id,
          category,
          variety,
          name,
          short_name,
          brand,
          packaging,
          ratings_average,
          price_normal,
          price_ten_for,
          price_two_for,
          price_current,
          price_percent_off,
          promotion_callout_text,
          promotion_discount_code,
        }) => {
          return (
            <>
              {isManage ? (
                <ManageProducts
                  props={{
                    id,
                    category,
                    variety,
                    name,
                    short_name,
                    brand,
                    ratings_average,
                    packaging,
                    price_normal,
                    price_ten_for,
                    price_two_for,
                    price_current,
                    price_percent_off,
                    promotion_callout_text,
                    promotion_discount_code,
                  }}
                  key={id}
                />
              ) : (
                <ProductItem
                  props={{
                    id,
                    category,
                    variety,
                    name,
                    short_name,
                    brand,
                    ratings_average,
                    packaging,
                    price_normal,
                    price_ten_for,
                    price_two_for,
                    price_current,
                    price_percent_off,
                    promotion_callout_text,
                    promotion_discount_code,
                  }}
                  key={id}
                />
              )}
            </>
          );
        },
      )}
    </div>
  ) : (
    <Loading />
  );
}
