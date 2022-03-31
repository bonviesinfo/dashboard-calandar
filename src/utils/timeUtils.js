import { intervalMS, startInterval, timePerHour, intervalMinute } from '../constants/dateGrid'

export const getZeroTime = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  // date.setMinutes(0)
  // date.setSeconds(0)
  // date.setMilliseconds(0)
  return date
}

export const locateEvent = (event, selectDateMs) => {
  const eventStartMs = new Date(event.pseudoStart || event.start).getTime()
  const eventEndMs = new Date(event.pseudoEnd || event.end).getTime()
  const eventStartIndex = Math.floor((eventStartMs - selectDateMs) / intervalMS)
  const eventEndIndex = Math.ceil((eventEndMs - selectDateMs) / intervalMS) - 1
  const eventLength = eventEndIndex - eventStartIndex + 1

  return {
    eventStartIndex,
    eventEndIndex,
    eventLength,
  }
}

export const showInterval = index => {
  const newIndex = index + startInterval
  const quo = Math.floor(newIndex / timePerHour)
  const rem = index % timePerHour
  const hour = (quo >= 24) ? (quo - 24).toString().padStart(2, '0') : quo.toString().padStart(2, '0')
  const min = (rem * intervalMinute).toString().padStart(2, '0')
  const decoration = newIndex >= (24 * timePerHour) ? '*' : ''

  return `${hour}:${min}${decoration}`
}