import { catPageData } from '@/app/lib/utils';
import { MAX_SMALLSCREEN, pagingSettings } from '@/app/lib/appData.json';
import CategoryMain from '@/app/ui/category/category-main';
import CategoryHeader from '@/app/ui/category/category-header';
// import CategoryToggleItems from "@/app/ui/category/category-toggle-items";
// import CategoryPaging from "@/app/ui/category/category-paging";
import CategoryNoResults from '@/app/ui/category/category-no-results';
// import FilterList from "@/app/ui/filters/filter_list";
import { Blurb } from '@/app/ui/blurb';

import styles from '@/app/_assets/css/category/Category.module.css';
import { DataProps, FilterProps, PagingProps } from '@/app/lib/definitions';
import {
  useSearchParams,
  usePathname,
  useRouter,
  useParams,
} from 'next/navigation';
import { categoryArr, dealArr } from '@/app/lib/appData.json';

type ParamProps = {
  category: string;
  variety: string;
};

import { capitalizeFirstLetter } from '../../lib/utils';
// import {
//   fetchProductsByCat,
//   fetchProductsByDealprice_two_forPrice,
//   fetchProductsByDealprice_ten_forPrice,
//   fetchProductsOnSpecial,
// } from "@/app/lib/data";
import Image from 'next/image';
const variety = '';
let products: DataProps[] = [];

export default async function Category({
  params: { urlCategory, urlVariety },
}: {
  params: { urlCategory: string; urlVariety: string };
}) {
  products = await catPageData(urlCategory);

  return (
    <CategoryMain
      arr={products}
      urlCategory={urlCategory}
      urlVariety={urlVariety}
    />
  );
}
