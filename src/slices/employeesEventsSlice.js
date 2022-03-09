import { createSlice } from '@reduxjs/toolkit'
import { dummyEventData } from '../data/dummyEmployeeData'

export const filterEventByDate = (date, events) => {
  return events.filter(event => {
    return new Date(event.start).toLocaleDateString() === new Date(date).toLocaleDateString()
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
  deleteEmployeeEvent,
  replaceEmployeeEvents
} = employeesEventsSlice.actions
export const selectEmployeeEvents = state => state.employeesEvents

export default employeesEventsSlice.reducer