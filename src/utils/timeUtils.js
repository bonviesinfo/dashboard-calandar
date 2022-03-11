export const getZeroTime = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  // date.setMinutes(0)
  // date.setSeconds(0)
  // date.setMilliseconds(0)
  return date
}