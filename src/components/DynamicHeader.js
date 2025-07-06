'use client';

import { useEffect, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';

const DynamicHeader = ({ bannerUrl, children }) => {
  const [bgColor, setBgColor] = useState('#bfdbfe');

  useEffect(() => {
    if (!bannerUrl) return;

    const fac = new FastAverageColor();
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = bannerUrl;

    img.onload = () => {
      try {
        const color = fac.getColor(img);
        setBgColor(color.hex);
      } catch (error) {
        console.error('Color extraction failed:', error);
      }
    };
  }, [bannerUrl]);

  return (
    <header
      className="relative flex flex-col items-center justify-center px-6 md:px-32 h-[375px] w-full transition-all duration-500"
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </header>
  );
};

export default DynamicHeader;
