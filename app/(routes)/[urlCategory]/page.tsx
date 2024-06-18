import { catPageData, hyphenate } from "@/app/lib/utils";
import CategoryMain from "@/app/ui/category/category-main";
import { CategoryParamsProps, DataProps } from "@/app/lib/definitions";
import Loading from "@/app/ui/loading";
import { Suspense } from "react";
import { Blurb } from "@/app/ui/blurb";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Category Page",
// };

export default async function Category({
  params: { urlCategory, urlVariety },
}: CategoryParamsProps) {
  let products: DataProps[] = await catPageData(
    decodeURIComponent(urlCategory)
  );

  // const strHeader = "";

  return (
    <article>
      <Blurb
        urlCategory={urlCategory}
        variety={urlVariety || hyphenate("")}
        // header={strHeader}
      />
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
