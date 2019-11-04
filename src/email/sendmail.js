export const cleanDates = days => {
  let split = days.split(',')

  const cleaned = split
    .map(day => {
      return day.trim()
    })
    .sort()

  return cleaned
}
