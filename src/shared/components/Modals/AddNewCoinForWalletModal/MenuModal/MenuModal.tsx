import styles from './MenuModal.module.scss';

import { Button } from '@/components/ui';

interface MenuModalProps {
  updatePageParam: (
    page: string | (string | null)[] | null,
    key: string | string[],
  ) => void;
}

export const MenuModal = ({ updatePageParam }: MenuModalProps) => {
  const onChangeTypeAdding = (value: string) => {
    updatePageParam([value, '1'], ['type', 'page']);
  };

  return (
    <div className={styles.container}>
      <Button onClick={() => onChangeTypeAdding('handle_adding')}>
        Добавить монету
      </Button>
      <Button
        formatType={'outline'}
        onClick={() => onChangeTypeAdding('ton_adding')}
      >
        Добавить активы по адресу сети TON
      </Button>
    </div>
  );
};
