import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const employeesOccupiedTimeSlice = createSlice({
  name: 'employeesOccupiedTime',
  initialState,
  reducers: {
    'updateEmployeesOccupiedTime': (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  }
})

export const { updateEmployeesOccupiedTime } = employeesOccupiedTimeSlice.actions
export const selectEmployeesOccupiedTime = state => state.employeesOccupiedTime

export default employeesOccupiedTimeSlice.reducer