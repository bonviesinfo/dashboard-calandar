import { createSlice } from '@reduxjs/toolkit'
import { dummyScheduleData } from '../data/dummyScheduleData'

// export const filterEventRecurBetweenMs = (events, startMs, endMs) => {
//   return events.filter(event => {

//     const eventStartMs = new Date(event.startRecur).getTime()
//     const eventEndMs = new Date(event.endRecur).getTime()

//     const beforeStartCheck = eventStartMs <= startMs && eventEndMs <= startMs
//     const afterEndCheck = eventStartMs >= endMs && eventEndMs >= endMs

//     return !beforeStartCheck && !afterEndCheck
//   })
// }

export const filterSchedulesByGridStart = (schedules, startMs) => {
  return schedules.filter(schedule => {
    if (!schedule.startRecur && !schedule.endRecur) return true
    const scheduleStartMs = new Date(schedule.startRecur).getTime()
    const scheduleEndMs = new Date(schedule.endRecur).getTime()

    const staggerBeforeCheck = (scheduleStartMs <= startMs || !schedule.startRecur) && scheduleEndMs <= startMs
    const staggerAfterCheck = scheduleStartMs >= startMs && (scheduleEndMs >= startMs || !schedule.endRecur)

    return !staggerBeforeCheck && !staggerAfterCheck
  })
}

const initialState = dummyScheduleData

const employeesScheduleSlice = createSlice({
  name: 'employeesSchedule',
  initialState,
  reducers: {
    'updateEmployeeSchedule': (state, action) => {
      return state.some(event => (event.employeeId === action.payload.employeeId))
        ? state.map(event => (event.employeeId === action.payload.employeeId)
          ? action.payload
          : event
        )
        : [
          ...state,
          action.payload,
        ]
    },
    'deleteEmployeeSchedule': (state, action) => {
      return state.filter(event => event.employeeId !== action.payload)
    }
  }
})

export const { updateEmployeeSchedule, deleteEmployeeSchedule } = employeesScheduleSlice.actions
export const selectEmployeesSchedule = state => state.employeesSchedule

export default employeesScheduleSlice.reducer