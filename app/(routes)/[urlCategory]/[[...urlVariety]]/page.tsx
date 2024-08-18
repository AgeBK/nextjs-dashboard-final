import { Suspense } from 'react';
import { fetchCategoryPageData } from '@/app/lib/utils';
import { CategoryParamsProps, DataProps } from '@/app/lib/definitions';
import CategoryMain from '@/app/ui/category/category-main';
import Loading from '@/app/ui/loading';

export default async function Page({
  params: { urlCategory, urlVariety }, // TODO: why urlVariety array
}: CategoryParamsProps) {
  const variety = urlVariety ? urlVariety[0] : undefined;
  const products: DataProps[] = await fetchCategoryPageData(urlCategory, variety); // various db calls based on URL
  // TODO: check every file for unused import etc
  // TODO: check mobile (header) / mobile category page, filter button doesn't load/ text in autoComplete doesn't change sometimes

  return (
    <article>
      <Suspense fallback={<Loading />}>
        <CategoryMain
          arr={products}
          urlCategory={urlCategory}
          urlVariety={variety}
          isManage={false}
        />
      </Suspense>
    </article>
  );
}
