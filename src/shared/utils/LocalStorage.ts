export function saveToStorage(key: string, data: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
export function loadFromStorage(key: string) {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  }
}
