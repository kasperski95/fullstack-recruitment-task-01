export function humanizeDate(date: Date) {
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}
