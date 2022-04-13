import { createSlice } from '@reduxjs/toolkit'
import { dummyScheduleData } from '../data/dummyScheduleData';

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