export const dummyEvents = [
  {
    title: 'event 1',
    start: '2022-01-24T14:30:00',
    end: '2022-01-24T15:30:00',
  },
  {
    title: 'event 2',
    start: '2022-01-10T11:30:00',
    end: '2022-01-12T00:00:00',
    allDay: true,
  },
  {
    groupId: 'blueEvents', // recurrent events in this group move together
    daysOfWeek: ['5'],
    // startTime: '10:45:00',
    // endTime: '12:45:00',
    allDay: true,
  },
]