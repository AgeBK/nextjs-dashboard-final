import { DataProps, ManagePageProps } from '@/app/lib/definitions';
import { fetchProductById } from '@/app/lib/data';
import ManageProduct from '@/app/ui/manage/manage-product';
import Error from '@/app/(routes)/error';
import data from '@/app/lib/appData.json';
import styles from '@/app/assets/css/manage/ManageProduct.module.css';

export default async function ManagePage({
  params: { action, id },
}: ManagePageProps) {
  const { selectItems, selectWineItems, productKeys } = data;

  const product: DataProps = id
    ? await fetchProductById(id[0])
    : { ...productKeys };

  if (product) {
    // remove properties from product obj for other components
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
  return <Error />;
}
