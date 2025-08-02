export const formatDate = (date: string | Date, isYear: boolean = false) => {
  const realDate = typeof date === 'string' ? new Date(date) : date;

  const formatted = realDate
    .toLocaleString('en-US', {
      year: isYear ? 'numeric' : undefined,
      month: 'short', // “Jun”
      day: 'numeric', // 28
      hour: '2-digit', // 14
      minute: '2-digit', // 32
      hour12: false, // 24-hour clock
    })
    .replace(',', '');

  return formatted;
};

import { Decimal } from 'decimal.js';

export function formatLengthNumber(
  value: number | undefined,
  precision = 3,
): number {
  if (typeof value === 'undefined') return 0;
  const decimalValue = new Decimal(value);

  if (Math.abs(value) >= 10) {
    // Для больших чисел: фиксированное количество знаков после запятой, убираем лишние нули
    return Number(
      decimalValue
        .toFixed(precision)
        .replace(/(\.\d*?[1-9])0+$/g, '$1') // убираем конечные нули
        .replace(/\.0+$/, ''),
    ); // убираем .0 если нет дробной части
  } else {
    // Для маленьких чисел: фиксированное количество значащих цифр
    return decimalValue.toSignificantDigits(precision).toNumber();
  }
}

const SUFFIXES = ['', 'K', 'M', 'B', 'T'] as const;

export function formatWithSuffix(num: number, precision = 1): string {
  if (!Number.isFinite(num)) {
    return '0';
  }

  const abs = Math.abs(num);
  // Для чисел меньше 1000 просто возвращаем исходное
  if (abs < 1000) {
    // Отбрасываем .0, если precision > 0
    return precision > 0
      ? num.toFixed(precision).replace(/\.0+$/, '')
      : Math.round(num).toString();
  }

  // Определяем индекс суффикса: логарифм по 10 / 3 → 1→K, 2→M и т.д.
  const idx = Math.min(Math.floor(Math.log10(abs) / 3), SUFFIXES.length - 1);
  const suffix = SUFFIXES[idx];

  // Делим на 1000^idx и форматируем
  const scaled = num / Math.pow(1000, idx);
  const str = scaled.toFixed(precision).replace(/\.0+$/, '');

  return `${str}${suffix}`;
}
