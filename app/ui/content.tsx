// import { ReactNode } from "react";
// import Loading from "@/app/ui/loading";
// import Error from "@/app/ui/error";
// // import { useGetWinesQuery } from "../../services/API";

// ** NOT USING

// type ContentProps = {
//   children: ReactNode;
// };

// const Content = ({ children }: ContentProps) => {
//   let content: ReactNode = null;
//   // const { error, isLoading, data } = useGetWinesQuery();
//   // const dataIsArray = Array.isArray(data);

//   if (error) {
//     content = <Error />;
//   } else if (isLoading) {
//     content = <Loading />;
//   } else if (dataIsArray) {
//     content = children;
//   } else {
//     content = <Error />;
//   }
//   return <main>{content}</main>;
// };

// export default Content;
