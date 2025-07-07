// components/MasonryWrapper.tsx
'use client';

import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 2,
  850: 1,
};

const Wrapper = ({ children }) => {
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
