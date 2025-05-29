import React from 'react'

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
export default function SkeletonFunction({ width, height, array }) {

  return (
    <>
      {array.map((item, i) => (
        <div className="skeleton-item" key={i}>
          <Skeleton height={height} width={width} />
        </div>
      ))}
    </>
  );
}


