import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

// const getOneEmployeeOccupiedTime = filteredEvents => {

// }

const employeesOccupiedTimeSlice = createSlice({
  name: 'employeesOccupiedTime',
  initialState,
  reducers: {
    'replaceEmployeesOccupiedTime': (state, action) => {
      return { ...action.payload }
    },
  }
})

export const { replaceEmployeesOccupiedTime
} = employeesOccupiedTimeSlice.actions
export const selectEmployeesOccupiedTime = state => state.employeesOccupiedTime

export default employeesOccupiedTimeSlice.reducer