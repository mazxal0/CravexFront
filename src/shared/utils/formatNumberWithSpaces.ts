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
export function formatNumberWithSpaces(num: number, spaceChar: string = ' ') {
  const str = num.toString().replace(/\s/g, '');
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, spaceChar);
}

export function formatNumberLength(num: any, length: number = 2) {
  if (typeof num !== 'number') {
    return '';
  }
  return num.toFixed(length).toString();
}
