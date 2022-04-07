import { createSlice } from '@reduxjs/toolkit'
import { dummyEventData } from '../data/dummyEmployeeData'
import { startHour, intervalMS } from '../constants/dateGrid'

export const filterEventByDate = (events, dateMs) => {
  const startCheckMs = dateMs + startHour * 60 * 60 * 1000
  const endCheckMs = dateMs + (startHour + 24) * 60 * 60 * 1000

  return events.filter(event => {
    const eventStartMs = new Date(event.start).getTime()
    const eventEndMs = new Date(event.end).getTime()

    const beforeStartCheck = eventStartMs <= startCheckMs && eventEndMs <= startCheckMs
    const afterEndCheck = eventStartMs >= endCheckMs && eventEndMs >= endCheckMs

    return !beforeStartCheck && !afterEndCheck
  })
}

export const filterEventBetweenMs = (events, startMs, endMs) => {
  return events.filter(event => {

    const eventStartMs = new Date(event.start).getTime()
    const eventEndMs = new Date(event.end).getTime()
    const beforeStartCheck = eventStartMs <= startMs && eventEndMs <= startMs
    const afterEndCheck = eventStartMs >= endMs && eventEndMs >= endMs

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

export const limitEventStartEnd = (events, datesMs) => {
  const originalStartMs = datesMs + startHour * 60 * 60 * 1000
  const originalEndMs = datesMs + (startHour + 24) * 60 * 60 * 1000

  return events.map(event => {
    const newEvent = { ...event }
    if (event.start < originalStartMs) {
      newEvent.pseudoStart = originalStartMs - intervalMS
    } else if (event.end > originalEndMs) {
      newEvent.pseudoEnd = originalEndMs + intervalMS
    }
    return newEvent
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
    'toggleEmployeeEventCheckIn': (state, action) => {
      return state.map(event => (event.id === action.payload)
        ? { ...event, isCheckIn: !event.isCheckIn }
        : event
      )
    },
  }
})

export const {
  addEmployeeEvent,
  updateEmployeeEvent,
  deleteEmployeeEvent,
  replaceEmployeeEvents,
  toggleEmployeeEventCheckIn,
} = employeesEventsSlice.actions
export const selectEmployeeEvents = state => state.employeesEvents

export default employeesEventsSlice.reducer