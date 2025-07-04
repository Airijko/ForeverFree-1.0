// components/MasonryWrapper.tsx
'use client';

import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1,
};

const WrapCommunities = ({ children }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-4"
      columnClassName="space-y-4"
    >
      {children}
    </Masonry>
  );
};

export default WrapCommunities;
