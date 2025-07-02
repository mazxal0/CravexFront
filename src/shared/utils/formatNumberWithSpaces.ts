// export function formatNumberWithSpaces(num: number): string {
//   // Преобразуем число в строку и убираем все существующие пробелы (на всякий случай)
//   const str = num.toString().replace(/\s/g, '');
//
//   // Разбиваем строку на части по 3 цифры с конца
//   const parts: string[] = [];
//   for (let i = str.length; i > 0; i -= 3) {
//     const start = Math.max(0, i - 3);
//     parts.unshift(str.slice(start, i));
//   }
//
//   // Соединяем части пробелами
//   return parts.join(' ');
// }
export function formatNumberWithSpaces(
  num: number,
  spaceChar: string = '\u00A0',
): string {
  const str = num.toString().replace(/\s/g, '');

  // Разделяем целую и дробную части
  const parts = str.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? `.${parts[1]}` : '';

  // Форматируем только целую часть
  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    spaceChar,
  );

  // Возвращаем объединённый результат
  return formattedInteger + decimalPart;
}

export function formatNumberLength(num: number, length: number = 2) {
  return num.toFixed(length);
}
