// components/MasonryWrapper.tsx
'use client';

import Masonry from 'react-masonry-css';

const Wrapper = ({ children, breakpointColumnsObj }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {children}
    </Masonry>
  );
};

export default Wrapper;
