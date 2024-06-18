// import CardWrapper from '@/app/ui/dashboard/cards';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import Cards from "@/app/ui/manage/cards";
import CategoryMain from '@/app/ui/category/category-main';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import { DataProps } from '@/app/lib/definitions';
import { catPageData } from '@/app/lib/utils';
import { fetchProducts } from '@/app/lib/data';

export default async function Page() {
  const arr = await fetchProducts();

  return (
    <>
      {/* <h1>Dashboard Main</h1> */}
      <div>
        <Suspense fallback={<CardsSkeleton />}>
          <CategoryMain
            arr={arr}
            urlCategory=""
            urlVariety=""
            isManage={true}
          />
        </Suspense>
      </div>
    </>
  );
}
