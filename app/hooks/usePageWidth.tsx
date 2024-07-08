'use client';

import { useState, useEffect } from 'react';

const usePageWidth = (threshold: number) => {
  const [isPageWidth, setIsPageWidth] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window) {
        const pageWidth = window.innerWidth < threshold;
        if (isPageWidth !== pageWidth) {
          setIsPageWidth(pageWidth);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [threshold, isPageWidth]);

  return isPageWidth;
};

export default usePageWidth;
