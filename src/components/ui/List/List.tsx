import Image from 'next/image';
import { FC } from 'react';

import styles from './List.module.scss';

import { ControlInput, SkeletonEl } from '@/components/ui';
import { ListProps } from '@/components/ui/List/List.props';

export const List: FC<ListProps> = ({
  ListElements = [],
  onSearch,
  onHandleChange,
  value,
  isLoading,
  ...props
}) => {
  return (
    <div {...props} className={styles.list}>
      <ControlInput
        delay={1000}
        onSearch={onSearch}
        onHandleChange={onHandleChange}
        value={value}
      />
      {isLoading ? (
        <SkeletonEl count={10} height={45} />
      ) : (
        ListElements.map((element, index) => (
          <div key={index} className={styles.element} onClick={element.onClick}>
            {element.imageUrl ? (
              <Image
                width={25}
                height={25}
                src={
                  element.imageUrl.startsWith('http')
                    ? element.imageUrl
                    : `/images/${element.imageUrl}`
                }
                alt={element.text}
              />
            ) : (
              <Image
                width={25}
                height={25}
                src="/images/fallback-image.png"
                alt="Fallback image"
              />
            )}
            <span>{element.text}</span>
          </div>
        ))
      )}
    </div>
  );
};
