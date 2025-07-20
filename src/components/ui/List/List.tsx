import Image from 'next/image';
import { FC } from 'react';

import clsx from 'clsx';

import styles from './List.module.scss';

import { ControlInput, SkeletonEl } from '@/components/ui';
import { ListProps } from '@/components/ui/List/List.props';

export const List: FC<ListProps> = ({
  ListElements = [],
  onSearch,
  onHandleChange,
  value,
  isLoading,
  placeholder,
  isScrolling,
  maxWidth,
  classname,
  ...props
}) => {
  return (
    <div
      style={{
        overflowY: isScrolling ? 'scroll' : 'visible',
        maxWidth: isScrolling ? maxWidth || 320 : '100%',
      }}
      className={clsx(styles.list, classname)}
      {...props}
    >
      <ControlInput
        delay={1000}
        onSearch={onSearch}
        onHandleChange={onHandleChange}
        value={value}
        placeholder={placeholder}
        label={'search'}
        backgroundLabel={'alternative'}
        formatSize={'sm'}
        className={styles.control_input}
      />
      {isLoading ? (
        <SkeletonEl count={10} height={45} />
      ) : ListElements.length ? (
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
      ) : (
        <div className={styles.empty}>Empty</div>
      )}
    </div>
  );
};
