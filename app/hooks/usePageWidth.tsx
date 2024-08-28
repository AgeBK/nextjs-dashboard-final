'use client';

import { useState, useEffect } from 'react';

const usePageWidth = (threshold: number) => {
  const [isPageWidth, setIsPageWidth] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const handleResize = () => {
      const pageWidth = window.innerWidth < threshold;
      if (isPageWidth !== pageWidth) {
        setIsPageWidth(pageWidth);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [threshold, isPageWidth]);

  return isPageWidth;
};

export default usePageWidth;
