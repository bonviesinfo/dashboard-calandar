import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const employeesEventsMappingSlice = createSlice({
  name: 'employeesEventsMapping',
  initialState,
  reducers: {
    'replaceEmployeesEventsMapping': (state, action) => {
      return { ...action.payload }
    },
  }
})

export const { replaceEmployeesEventsMapping } = employeesEventsMappingSlice.actions
export const selectEmployeesEventsMapping = state => state.employeesEventsMapping
export default employeesEventsMappingSlice.reducer