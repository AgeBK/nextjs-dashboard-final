// import { fetchCarouselProducts } from "@/app/lib/data";
// import { DataProps } from "@/app/lib/definitions";
// import CarouselItems from "./carousel-items";
// import { Suspense } from "react";
// import Loading from "../loading";

// type ParamProps = {
//   params: { urlCategory: string; urlVariety: string };
// };

// export default async function Carousel({
//   params: { urlCategory, urlVariety },
// }: ParamProps) {
//   console.log("Carousel");
//   console.log(urlCategory, urlVariety);

//   let carouselItems: DataProps[] = [];
// carouselItems = await fetchCarouselProducts();
//   console.log(carouselItems);

//   return (
//     <Suspense fallback={<Loading />}>
//       <CarouselItems arr={carouselItems} />
//     </Suspense>
//   );
// }
