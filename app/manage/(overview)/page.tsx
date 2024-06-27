import CategoryManageMain from '@/app/ui/category/category-main';
import { fetchProducts } from '@/app/lib/data';

export default async function Page() {
  const arr = await fetchProducts();

  return (
    <CategoryManageMain
      arr={arr}
      urlCategory=""
      urlVariety=""
      isManage={true}
    />
  );
}
