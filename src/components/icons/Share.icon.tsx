import { FC } from 'react';

import { IconProps } from '@/components/icons/IconProps';

export const ShareIcon: FC<IconProps> = ({
  width = 40,
  height = 40,
  color,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 64 64"
    >
      <path
        fill={color}
        d="M 22 8 A 8 8 0 0 0 22 24 A 8 8 0 0 0 26.34375 22.710938 L 40.123047 30.617188 A 8 8 0 0 0 40.128906 33.373047 L 27.863281 42.566406 A 8 8 0 0 0 22 40 A 8 8 0 0 0 22 56 A 8 8 0 0 0 29.810547 46.287109 L 43.195312 38.394531 A 8 8 0 0 0 48 40 A 8 8 0 0 0 48 24 A 8 8 0 0 0 41.964844 26.763672 L 29.740234 18.003906 A 8 8 0 0 0 22 8 z"
      ></path>
    </svg>
  );
};
