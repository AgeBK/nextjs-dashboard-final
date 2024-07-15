import { Suspense } from 'react';
import { fetchCategoryPageData } from '@/app/lib/utils';
import { CategoryParamsProps, DataProps } from '@/app/lib/definitions';
import CategoryMain from '@/app/ui/category/category-main';
import Loading from '@/app/ui/loading';

export default async function Page({
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
