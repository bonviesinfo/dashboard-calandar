export const calcMs = (day, hour, min, sec, ms) => {
  let outputMS = 0
  day && (outputMS += day * 24 * 60 * 60 * 1000)
  hour && (outputMS += hour * 60 * 60 * 1000)
  min && (outputMS += min * 60 * 1000)
  sec && (outputMS += sec * 1000)
  ms && (outputMS += ms)
  return outputMS
}


export const dummyScheduleData = [
  {
    id: 's1',
    employeeId: 'cm1',
    startTime: calcMs(0, 9),
    endTime: calcMs(0, 18),
  },
  {
    id: 's2',
    employeeId: 'cm2',
    startTime: calcMs(0, 9),
    endTime: calcMs(0, 18),
  },
  {
    id: 's3',
    employeeId: 'cm3',
    startTime: calcMs(0, 9, 30),
    endTime: calcMs(0, 19),
  },
  {
    id: 's4',
    employeeId: 'cm4',
    startTime: calcMs(0, 10, 30),
    endTime: calcMs(0, 10, 30),
  },
  {
    id: 's9',
    employeeId: 'cm9',
    daysOfWeek: [1, 2, 3, 4, 5],
  },
]


