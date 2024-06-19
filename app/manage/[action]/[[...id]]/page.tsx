import ManageProduct from '../../../ui/manage/manage-product';
import { DataProps } from '@/app/lib/definitions';
import { fetchProductsById } from '@/app/lib/data';
import {
  selectItems,
  selectWineItems,
  productKeys,
} from '@/app/lib/appData.json';
import styles from '@/app/_assets/css/manage/ManageProduct.module.css';

type PageProps = {
  params: {
    action: string;
    id: string;
  };
};

export default async function Page({ params: { action, id } }: PageProps) {
  const product: DataProps = id
    ? await fetchProductsById(id[0])
    : { ...productKeys };

  const pickObjItems = (obj: DataProps, arr: string[]) =>
    Object.fromEntries(
      Object.entries(obj).filter(([key]) => {
        if (arr.includes(key)) {
          delete product[key as keyof DataProps];
          return true;
        }
        return false;
      }),
    );

  const ddlWineItems = pickObjItems(product, selectWineItems);
  const ddlItems = pickObjItems(product, selectItems);

  return (
    <>
      <h1 className={styles.hdr}> {`${action} Product`}</h1>
      <div className={styles.prodCont}>
        <ManageProduct
          product={product}
          action={action}
          ddlWineItems={ddlWineItems}
          ddlItems={ddlItems}
        />
      </div>
    </>
  );
}
