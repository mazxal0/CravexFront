// import {
//   ColorType,
//   createChart,
//   IChartApi,
//   ISeriesApi,
//   LineData,
//   LineSeries,
//   LineType,
// } from 'lightweight-charts';
// import { useEffect, useRef } from 'react';
//
// const LineChart = () => {
//   const chartContainerRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<IChartApi | null>(null);
//   const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);
//
//   // Пример данных для линейного графика
//   const initialData: LineData[] = [
//     { time: '2023-07-24', value: 29180 },
//     { time: '2023-07-25', value: 29230 },
//     { time: '2023-07-26', value: 29270 },
//     { time: '2023-07-27', value: 29320 },
//     { time: '2023-07-28', value: 29350 },
//     { time: '2023-07-29', value: 29380 },
//     { time: '2023-07-30', value: 29440 },
//     { time: '2023-07-31', value: 29510 },
//     { time: '2023-08-01', value: 29590 },
//     { time: '2023-08-02', value: 29650 },
//     { time: '2023-08-03', value: 29680 },
//     { time: '2023-08-04', value: 29720 },
//     { time: '2023-08-05', value: 29790 },
//     { time: '2023-08-06', value: 29850 },
//     { time: '2023-08-07', value: 29910 },
//     { time: '2023-08-08', value: 29950 },
//     { time: '2023-08-09', value: 30020 },
//     { time: '2023-08-10', value: 30080 },
//     { time: '2023-08-11', value: 30130 },
//     { time: '2023-08-12', value: 30170 },
//     { time: '2023-08-13', value: 30210 },
//     { time: '2023-08-14', value: 30260 },
//     { time: '2023-08-15', value: 30300 },
//     { time: '2023-08-16', value: 30340 },
//     { time: '2023-08-17', value: 30400 },
//     { time: '2023-08-18', value: 30470 },
//     { time: '2023-08-19', value: 30510 },
//     { time: '2023-08-20', value: 30570 },
//     { time: '2023-08-21', value: 30630 },
//     { time: '2023-08-22', value: 3690 },
//     { time: '2023-08-23', value: 3720 },
//     { time: '2023-08-24', value: 30780 },
//     { time: '2023-08-25', value: 30840 },
//     { time: '2023-08-26', value: 30900 },
//     { time: '2023-08-27', value: 30960 },
//     { time: '2023-08-28', value: 31020 },
//     { time: '2023-08-29', value: 31070 },
//     { time: '2023-08-30', value: 31130 },
//     { time: '2023-08-31', value: 31180 },
//     { time: '2023-09-01', value: 31220 },
//     { time: '2023-09-02', value: 31270 },
//     { time: '2023-09-03', value: 31310 },
//     { time: '2023-09-04', value: 31360 },
//     { time: '2023-09-05', value: 31400 },
//     { time: '2023-09-06', value: 31440 },
//     { time: '2023-09-07', value: 31490 },
//     { time: '2023-09-08', value: 31530 },
//     { time: '2023-09-09', value: 31570 },
//     { time: '2023-09-10', value: 31610 },
//     { time: '2023-09-11', value: 31660 },
//     { time: '2023-09-12', value: 31700 },
//     { time: '2023-09-13', value: 31740 },
//     { time: '2023-09-14', value: 31780 },
//     { time: '2023-09-15', value: 31830 },
//     { time: '2023-09-16', value: 31880 },
//     { time: '2023-09-17', value: 31930 },
//     { time: '2023-09-18', value: 31990 },
//     { time: '2023-09-19', value: 32040 },
//     { time: '2023-09-20', value: 32090 },
//     { time: '2023-09-21', value: 32130 },
//     { time: '2023-09-22', value: 32170 },
//     { time: '2023-09-23', value: 32220 },
//     { time: '2023-09-24', value: 32280 },
//     { time: '2023-09-25', value: 32330 },
//     { time: '2023-09-26', value: 32370 },
//     { time: '2023-09-27', value: 32420 },
//     { time: '2023-09-28', value: 32470 },
//     { time: '2023-09-29', value: 32510 },
//     { time: '2023-09-30', value: 32560 },
//     { time: '2023-10-01', value: 32610 },
//     { time: '2023-10-02', value: 32660 },
//     { time: '2023-10-03', value: 32720 },
//     { time: '2023-10-04', value: 32770 },
//     { time: '2023-10-05', value: 32820 },
//     { time: '2023-10-06', value: 32860 },
//     { time: '2023-10-07', value: 32910 },
//     { time: '2023-10-08', value: 32970 },
//     { time: '2023-10-09', value: 33020 },
//     { time: '2023-10-10', value: 33080 },
//     { time: '2023-10-11', value: 33140 },
//     { time: '2023-10-12', value: 33200 },
//     { time: '2023-10-13', value: 33250 },
//     { time: '2023-10-14', value: 33310 },
//     { time: '2023-10-15', value: 33360 },
//     { time: '2023-10-16', value: 33420 },
//     { time: '2023-10-17', value: 33470 },
//     { time: '2023-10-18', value: 33520 },
//     { time: '2023-10-19', value: 33570 },
//     { time: '2023-10-20', value: 33620 },
//     { time: '2023-10-21', value: 33680 },
//     { time: '2023-10-22', value: 33730 },
//     { time: '2023-10-23', value: 33780 },
//     { time: '2023-10-24', value: 33830 },
//     { time: '2023-10-25', value: 33890 },
//     { time: '2023-10-26', value: 33940 },
//     { time: '2023-10-27', value: 33990 },
//     { time: '2023-10-28', value: 34050 },
//     { time: '2023-10-29', value: 34100 },
//     { time: '2023-10-30', value: 34150 },
//     { time: '2023-10-31', value: 34210 },
//   ];
//
//   useEffect(() => {
//     if (!chartContainerRef.current) return;
//
//     const chart = createChart(chartContainerRef.current, {
//       layout: {
//         background: { type: ColorType.Solid, color: '#1A1D28' },
//         textColor: '#FF9360',
//         fontSize: 12,
//       },
//       width: chartContainerRef.current.clientWidth,
//       height: 500,
//       grid: {
//         vertLines: { visible: false },
//         horzLines: { color: '#2B2B43' },
//       },
//       rightPriceScale: {
//         borderColor: '#464651',
//       },
//     });
//
//     // Добавляем линейную серию
//     const lineSeries = chart.addSeries<'Line'>(LineSeries, {
//       color: '#FF9360', // Основной цвет линии
//       lineWidth: 2,
//       lineType: LineType.Curved, // Сглаженная линия
//       crosshairMarkerVisible: true,
//       crosshairMarkerRadius: 5,
//     });
//
//     lineSeries.setData(initialData);
//
//     // Настройка адаптивности
//     const resizeObserver = new ResizeObserver((entries) => {
//       if (entries.length === 0 || !chartContainerRef.current) return;
//       chart.applyOptions({
//         width: chartContainerRef.current.clientWidth,
//         height: chartContainerRef.current.clientHeight,
//       });
//     });
//
//     resizeObserver.observe(chartContainerRef.current);
//
//     return () => {
//       resizeObserver.disconnect();
//       chart.remove();
//     };
//   }, []);
//
//   return (
//     <div
//       ref={chartContainerRef}
//       style={{
//         width: '100%',
//         height: '500px',
//         borderRadius: '8px',
//         overflow: 'hidden',
//         border: '1px solid #2B2B43',
//         backgroundColor: '#1A1D28',
//         margin: '40px',
//       }}
//     />
//   );
// };
//
// export default LineChart;
// 'use client';
//
// import {
//   ColorType,
//   createChart,
//   IChartApi,
//   ISeriesApi,
//   LineData,
//   LineSeries,
// } from 'lightweight-charts';
// import React, { useEffect, useRef } from 'react';
//
// import styles from './Chart.module.scss';
//
// interface ChartComponentProps {
//   data: LineData[];
// }
//
// const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
//   const chartContainerRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<IChartApi | null>(null);
//   const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);
//
//   useEffect(() => {
//     if (chartContainerRef.current) {
//       // Динамическое вычисление minValue и maxValue
//       const values = data.map((item) => item.value);
//       const min = Math.min(...values);
//       const max = Math.max(...values);
//       const range = max - min;
//       // Округление до "круглых" чисел и добавление отступов (10% от диапазона)
//       const minValue = Math.floor(min / 1000) * 1000 - range * 0.1;
//       const maxValue = Math.ceil(max / 1000) * 1000 + range * 0.1;
//       // Вычисление шага для ~5 меток
//       const step = Math.round(range / 5 / 100) * 100; // Округление шага до сотен
//       chartRef.current = createChart(chartContainerRef.current, {
//         layout: {
//           background: { type: ColorType.Solid, color: '#293038' },
//           textColor: '#FF9360',
//           fontSize: 12,
//         },
//         timeScale: {
//           timeVisible: true,
//           secondsVisible: false,
//         },
//         grid: {
//           vertLines: { visible: false },
//           horzLines: { visible: false },
//         },
//       });
//       // Настройка ценовой шкалы (оси Y)
//       chartRef.current.priceScale('right').applyOptions({
//         autoScale: true, // Автоматическое масштабирование
//         scaleMargins: {
//           top: 0.1, // Отступ сверху
//           bottom: 0.1, // Отступ снизу
//         },
//         ticksVisible: true, // Показывать деления
//         entireTextOnly: true,
//       });
//
//       // Настройка серии с priceFormat для ~5 делений
//       seriesRef.current = chartRef.current.addSeries(LineSeries, {
//         color: '#FF9360',
//         lineWidth: 2,
//         priceFormat: {
//           type: 'price',
//           precision: 6, // Без десятичных знаков
//           minMove: 0.000001,
//           // minMove: step || 1000, // Динамический шаг или 1000 по умолчанию
//         },
//       });
//       chartRef.current.applyOptions({
//         localization: {
//           priceFormatter: (price: number) => {
//             // Округляем до 2-3 знаков (можно настроить под свои нужды)
//             if (price >= 1000) {
//               return price.toFixed(0); // Для больших чисел — без дробной части
//             } else if (price >= 1) {
//               return price.toFixed(2); // Для чисел 1-1000 — 2 знака
//             } else {
//               return price.toFixed(3); // Для чисел <1 — 3 знака
//             }
//           },
//         },
//       });
//       seriesRef.current.setData(data);
//
//       const resizeObserver = new ResizeObserver(() => {
//         if (chartRef.current && chartContainerRef.current) {
//           chartRef.current.resize(chartContainerRef.current.clientWidth, 500);
//         }
//       });
//       resizeObserver.observe(chartContainerRef.current);
//
//       return () => {
//         resizeObserver.disconnect();
//         if (chartRef.current) {
//           chartRef.current.remove();
//         }
//       };
//     }
//   }, []);
//
//   useEffect(() => {
//     if (seriesRef.current && data) {
//       seriesRef.current.setData(data);
//     }
//   }, [data]);
//
//   return <div ref={chartContainerRef} className={styles.chart_div} />;
// };
//
// export default ChartComponent;

'use client';
import {
  ColorType,
  createChart,
  IChartApi,
  ISeriesApi,
  LineData,
  LineSeries,
} from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

import styles from './Chart.module.scss';

interface LineChartProps {
  data: LineData[];
  width?: number;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = '100%',
  height = 500,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#293038' },
        textColor: '#FF9360',
        fontSize: 12,
      },
      width: chartContainerRef.current.clientWidth,
      height,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
    });

    seriesRef.current = chartRef.current.addSeries(LineSeries, {
      color: '#FF9360',
      lineWidth: 2,
      lineType: 2,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current && data.length > 0) {
      seriesRef.current.setData(data);
      chartRef.current?.timeScale().fitContent();
    }
  }, [data]);

  return <div className={styles.chart_div} ref={chartContainerRef} />;
};

export default LineChart;

// 'use client';
//
// import {
//   CandlestickData,
//   CandlestickSeries,
//   ColorType,
//   createChart,
//   IChartApi,
//   ISeriesApi,
//   LineData,
//   LineSeries,
// } from 'lightweight-charts';
// import React, { useEffect, useRef, useState } from 'react';
//
// import styles from './Chart.module.scss';
//
// interface ChartComponentProps {
//   data?: LineData[] | CandlestickData[];
// }
//
// const ChartComponent: React.FC<ChartComponentProps> = ({ data = [] }) => {
//   const [chartType, setChartType] = useState<'line' | 'candlestick'>('line');
//   const chartContainerRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<IChartApi | null>(null);
//   const seriesRef = useRef<
//     ISeriesApi<'Line'> | ISeriesApi<'Candlestick'> | null
//   >(null);
//   const [initialized, setInitialized] = useState(false);
//
//   // Инициализация графика
//   useEffect(() => {
//     if (!chartContainerRef.current) return;
//
//     try {
//       chartRef.current = createChart(chartContainerRef.current, {
//         layout: {
//           background: { type: ColorType.Solid, color: '#293038' },
//           textColor: '#FF9360',
//           fontSize: 12,
//         },
//         width: chartContainerRef.current.clientWidth,
//         height: 500,
//         timeScale: {
//           timeVisible: true,
//           secondsVisible: false,
//         },
//         grid: {
//           vertLines: { visible: false },
//           horzLines: { visible: false },
//         },
//       });
//
//       setInitialized(true);
//     } catch (error) {
//       console.error('Error initializing chart:', error);
//     }
//
//     return () => {
//       if (chartRef.current) {
//         chartRef.current.remove();
//         chartRef.current = null;
//       }
//     };
//   }, []);
//
//   // Обновление данных и типа графика
//   useEffect(() => {
//     if (!initialized || !chartRef.current || data.length === 0) return;
//
//     try {
//       // Удаляем старую серию
//       if (seriesRef.current) {
//         chartRef.current.removeSeries(seriesRef.current);
//         seriesRef.current = null;
//       }
//
//       // Создаем новую серию
//       if (chartType === 'line') {
//         seriesRef.current = chartRef.current.addSeries(LineSeries, {
//           color: '#FF9360',
//           lineWidth: 2,
//           lineType: 2, // LineType.WithSteps
//         });
//         (seriesRef.current as ISeriesApi<'Line'>).setData(data as LineData[]);
//       } else {
//         seriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
//           upColor: '#26a69a',
//           downColor: '#ef5350',
//           borderVisible: false,
//           wickUpColor: '#26a69a',
//           wickDownColor: '#ef5350',
//         });
//         (seriesRef.current as ISeriesApi<'Candlestick'>).setData(
//           data as CandlestickData[],
//         );
//       }
//
//       chartRef.current.timeScale().fitContent();
//     } catch (error) {
//       console.error('Error updating chart:', error);
//     }
//   }, [chartType, data, initialized]);
//
//   // Обработка ресайза
//   useEffect(() => {
//     if (!initialized || !chartContainerRef.current) return;
//
//     const resizeObserver = new ResizeObserver(() => {
//       if (chartRef.current && chartContainerRef.current) {
//         chartRef.current.resize(chartContainerRef.current.clientWidth, 500);
//       }
//     });
//
//     resizeObserver.observe(chartContainerRef.current);
//     return () => resizeObserver.disconnect();
//   }, [initialized]);
//
//   return (
//     <div className={styles.chart_container}>
//       <div className={styles.chart_controls}>
//         <button
//           onClick={() => setChartType('line')}
//           className={chartType === 'line' ? styles.active : ''}
//         >
//           Линия
//         </button>
//         <button
//           onClick={() => setChartType('candlestick')}
//           className={chartType === 'candlestick' ? styles.active : ''}
//         >
//           Свечи
//         </button>
//       </div>
//       <div
//         ref={chartContainerRef}
//         className={styles.chart_div}
//         style={{ height: '500px' }}
//       />
//     </div>
//   );
// };
//
// export default ChartComponent;
