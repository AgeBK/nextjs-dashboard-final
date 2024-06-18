"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
const useSetPath = () => {
  const [path, setpath] = useState("/");
  const prevRef = useRef("");

  const router = useRouter();

  // useEffect(() => {
  //   if (window.location && prevRef.current !== path) {
  //     console.log(window.location.pathname);

  //     setpath(`/login?callbackUrl=${window.location.pathname}`);
  //   }
  // });

  // const handlePath = () =>
  //   setpath(`/login?callbackUrl=${window.location.pathname}`);

  // useEffect(() => {
  //   console.log(router.query); // route /notes/1 -> { id: 1 }
  // }, [router.query]);

  return path;
};

export default useSetPath;
