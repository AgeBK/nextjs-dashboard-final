'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
// TODO: do i need this?
function MyApp({ Component, pageProps }) {
  console.log('MyApp');

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentElement) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
