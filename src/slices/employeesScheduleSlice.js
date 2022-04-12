import { createSlice } from '@reduxjs/toolkit'
import { dummyScheduleData } from '../data/dummyScheduleData';

const initialState = dummyScheduleData

const employeesScheduleSlice = createSlice({
  name: 'employeesSchedule',
  initialState,
  reducers: {
    'updateEmployeeSchedule': (state, action) => {
      return state.map(event => (event.employeeId === action.payload.employeeId)
        ? action.payload
        : event
      )
    },
    'deleteEmployeeSchedule': (state, action) => {
      return state.filter(event => event.employeeId !== action.payload)
    }
  }
})

export const { updateEmployeeSchedule, deleteEmployeeSchedule } = employeesScheduleSlice.actions
export const selectEmployeesSchedule = state => state.employeesSchedule

export default employeesScheduleSlice.reducer