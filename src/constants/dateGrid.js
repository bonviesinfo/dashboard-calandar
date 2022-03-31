export const startHour = 9 //hour
export const intervalMinute = 15 //min
export const timePerHour = 60 / intervalMinute
export const startInterval = startHour * timePerHour
export const intervalMS = intervalMinute * 60 * 1000
export const gridLength = (24 * timePerHour)
export const nthNum = (gridLength + 1) * 4 + 1