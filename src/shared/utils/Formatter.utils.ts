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
