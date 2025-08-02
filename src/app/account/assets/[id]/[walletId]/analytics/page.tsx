// BarChart.tsx
'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';

import styles from './page.module.scss';

ChartJS.register(
  CategoryScale, // для оси X с категориальными метками
  LinearScale, // для оси Y
  BarElement, // для отрисовки столбцов
  Title, // плагин заголовка
  Tooltip, // плагин подсказок
  Legend, // плагин легенды (можно убрать, если не нужен)
);

const sampleData: ChartData<'bar'> = {
  labels: ['Янв', 'Фев', 'Март', 'Апр'],
  datasets: [
    {
      label: 'Продажи',
      data: [65, 59, 80, 81],
      borderRadius: 4,
      backgroundColor: '#2c3e50',
      barPercentage: 0.6,
    },
  ],
};

const options: ChartOptions<'bar'> = {
  // минималистичный стиль
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    title: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#666' },
    },
    y: {
      grid: { color: '#eee' },
      ticks: { color: '#666' },
    },
  },
};

const BarChart: FC = () => {
  return (
    <div className={styles.container}>
      <Bar data={sampleData} options={options} />
    </div>
  );
};

import { AnalyticsCard } from '@/shared/components';
export default function AnalyticsWallet() {
  return (
    <div className={styles.page}>
      Analytics Wallet
      <AnalyticsCard title={'All'}>
        <p>Qwerty123</p>
        <BarChart />
      </AnalyticsCard>
    </div>
  );
}
