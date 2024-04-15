export function getLastSaturday() {
  let date = new Date()
  const day = date.getDay()
  if (day !== 6) {
      date.setDate(date.getDate() - day - 1)
  }
  return date
}

export function getLastSaturdayString() {
  const date = getLastSaturday()
  return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`
}

export function getIsNewTweet(createdAt) {
  const lastSaturday = getLastSaturday().getTime(),
        diffInDays = (new Date(createdAt).getTime() - lastSaturday) / (1000 * 60 * 60 * 24)
  return diffInDays > -2
}
