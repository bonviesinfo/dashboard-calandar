import { createSlice } from '@reduxjs/toolkit'
import { dummyEventData } from '../data/dummyEmployeeData'
import { startHour } from '../constants/dateGrid'

export const filterEventByDate = (events, dateMs) => {
  const startCheckMs = dateMs + startHour * 60 * 60 * 1000
  const endCheckMs = dateMs + (startHour + 24) * 60 * 60 * 1000

  return events.filter(event => {
    const todayCheck = new Date(event.start).getTime() >= startCheckMs
    const tomorrowCheck = new Date(event.start).getTime() < endCheckMs

    return todayCheck && tomorrowCheck
  })
}

export const filterEventBetweenMs = (events, startMs, endMs) => {
  return events.filter(event => {

    const eventStartMs = new Date(event.start).getTime()
    const eventEndMs = new Date(event.end).getTime()

    const beforeStartCheck = eventStartMs < startMs && eventEndMs < startMs
    const afterEndCheck = eventStartMs > endMs && eventEndMs > endMs

    return !beforeStartCheck && !afterEndCheck
  })
}

export const filterEventByEmployeeId = (events, employeeId) => {
  return events.filter(event => event.employeeId === employeeId)
}

export const filterAnonymousEvent = (events, isAnonymous) => {
  return events.filter(event => {
    return isAnonymous ? !Boolean(event.employeeId) : Boolean(event.employeeId)
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