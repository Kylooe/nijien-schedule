export function getLastSaturday() {
  let date = new Date()
  const day = date.getDay()
  if (day !== 6) {
      date.setDate(date.getDate() - day - 1)
  }
  return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`
}
