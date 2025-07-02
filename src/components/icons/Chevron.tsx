import React from 'react';

import { IconProps } from '@/components/icons/IconProps';

export const Chevron = ({ width, height, color, direction }: IconProps) => {
  return (
    <svg
      style={
        direction === 'top'
          ? {}
          : direction === 'left'
            ? { rotate: '-90deg' }
            : { rotate: '180deg' }
      }
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 10"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M17 9 9 1M9 1 1 9" />
      </g>
    </svg>
  );
};
