import { createSlice } from '@reduxjs/toolkit'
import { dummyEventData } from '../data/dummyEmployeeData'
import { startHour } from '../constants/dateGrid'

export const filterEventByDate = (date, events) => {
  const startCheckMs = date + startHour * 60 * 60 * 1000
  const endCheckMs = date + (startHour + 24) * 60 * 60 * 1000

  return events.filter(event => {
    const todayCheck = new Date(event.start).getTime() >= startCheckMs
    const tomorrowCheck = new Date(event.start).getTime() < endCheckMs

    return todayCheck && tomorrowCheck
  })
}

const initialState = dummyEventData

const employeesEventsSlice = createSlice({
  name: 'employeesEvents',
  initialState,
  reducers: {
    'addEmployeeEvent': (state, action) => {
      state.push(action.payload)
    },
    'updateEmployeeEvent': (state, action) => {
      return state.map(event => (event.id === action.payload.id)
        ? action.payload
        : event
      )
    },
    'deleteEmployeeEvent': (state, action) => {
      return state.filter(event => event.id !== action.payload)
    },
    'replaceEmployeeEvents': (state, action) => {
      return action.payload
    },
  }
})

export const {
  addEmployeeEvent,
  updateEmployeeEvent,
  deleteEmployeeEvent,
  replaceEmployeeEvents
} = employeesEventsSlice.actions
export const selectEmployeeEvents = state => state.employeesEvents

export default employeesEventsSlice.reducer