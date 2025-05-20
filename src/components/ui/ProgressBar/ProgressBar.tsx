import { motion } from 'framer-motion';
import { FC } from 'react';

import { ProgressBarProps } from '@/components/ui/ProgressBar/ProgressBar.props';

export const ProgressBar: FC<ProgressBarProps> = ({ progress, color }) => {
  return (
    <div style={{ width: '100%', background: '#eee', borderRadius: 8 }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        style={{ height: 10, background: '#0070f3', borderRadius: 8 }}
      />
    </div>
  );
};
