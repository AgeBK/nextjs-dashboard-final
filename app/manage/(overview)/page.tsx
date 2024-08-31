import CategoryMain from '@/app/ui/category/category-main';
import { fetchProducts } from '@/app/lib/data';
import ManageSideNav from '@/app/ui/manage/manage-sidenav';
import styles from '@/app/assets/css/manage/ManageLayout.module.css';

// CategoryMain component used for category page and main manage page
// manage page fetches all products / cateogry page filters by URL
export default async function Page() {
  const arr = await fetchProducts();

  return (
    <div className={styles.container}>
      <ManageSideNav />
      <CategoryMain arr={arr} urlCategory="" urlVariety="" isManage={true} />
    </div>
  );
}
