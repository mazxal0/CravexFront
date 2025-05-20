import { FC } from 'react';

import { IconProps } from '@/components/icons/IconProps';

export const NotificationBell: FC<IconProps> = ({
  width,
  height,
  color,
  onClick,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      width={width}
      height={height}
      onClick={onClick}
      viewBox="0 0 32 32"
    >
      <path d="M25 21.78V14a9 9 0 0 0-6-8.47V5a3 3 0 0 0-6 0v.53A9 9 0 0 0 7 14v4a1 1 0 0 0 2 0v-4a7 7 0 0 1 14 0v7h-1a1 1 0 0 0 0 2h1a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2h9a1 1 0 0 0 0-2H9a3 3 0 0 0 0 6h2.42a5 5 0 0 0 9.16 0H23a3 3 0 0 0 2-5.22zM15 5a1 1 0 0 1 2 0zm1 23a3 3 0 0 1-2.23-1h4.46A3 3 0 0 1 16 28z" />
    </svg>
  );
};
