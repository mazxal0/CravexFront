// components/Skeleton.tsx
'use client';

import React from 'react';
import Skeleton, {
  SkeletonProps as RSkeletonProps,
} from 'react-loading-skeleton';

export type SkeletonProps = Partial<RSkeletonProps> & {
  className?: string;
  style?: React.CSSProperties;
};

export const SkeletonEl: React.FC<SkeletonProps> = ({
  className,
  style,
  baseColor = 'var(--card-bg-color)', // тёмно-серый
  highlightColor = 'var(--card-bg-border-color)', // чуть светлее
  ...props
}) => (
  <Skeleton
    containerClassName={className}
    style={style}
    baseColor={baseColor}
    highlightColor={highlightColor}
    {...props}
  />
);
