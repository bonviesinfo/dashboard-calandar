import { createSlice } from '@reduxjs/toolkit'
import { dummyEventData } from '../data/dummyEmployeeData'

const initialState = dummyEventData

const employeesEventsSlice = createSlice({
  name: 'employeesEvents',
  initialState,
  reducers: {
    'addEmployeeEvent': (state, action) => {
      state.push(action.payload)
    },
  }
})

export const { addEmployeeEvent } = employeesEventsSlice.actions
export const selectEmployeeEvents = state => state.employeesEvents

export default employeesEventsSlice.reducer