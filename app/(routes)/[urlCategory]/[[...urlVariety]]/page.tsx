import { fetchCategoryPageData, hyphenate } from '@/app/lib/utils';
import CategoryMain from '@/app/ui/category/category-main';
import { CategoryParamsProps, DataProps } from '@/app/lib/definitions';
import Loading from '@/app/ui/loading';
import { Suspense } from 'react';
import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: "Category Page",
// };

export default async function Category({
  params: { urlCategory, urlVariety },
}: CategoryParamsProps) {
  const variety = urlVariety ? urlVariety[0] : undefined;
  let products: DataProps[] = await fetchCategoryPageData(urlCategory, variety);
  // TODO: check site semantics
  return (
    <article>
      <Suspense fallback={<Loading />}>
        <CategoryMain
          arr={products}
          urlCategory={urlCategory}
          urlVariety={urlVariety}
          isManage={false}
        />
      </Suspense>
    </article>
  );
}