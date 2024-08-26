import CategoryMain from '@/app/ui/category/category-main';
import { fetchProducts } from '@/app/lib/data';

// CategoryMain component used for category page and main manage page
// manage page fetches all products / cateogry page filters by URL
export default async function Page() {
  const arr = await fetchProducts();

  return (
    <CategoryMain arr={arr} urlCategory="" urlVariety="" isManage={true} />
  );
}
