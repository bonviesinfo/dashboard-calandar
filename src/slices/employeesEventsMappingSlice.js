import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const employeesEventsMappingSlice = createSlice({
  name: 'employeesEventsMapping',
  initialState,
  reducers: {
    'updateEmployeesEventsMapping': (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  }
})

export const { updateEmployeesEventsMapping } = employeesEventsMappingSlice.actions
export const selectEmployeesEventsMapping = state => state.employeesEventsMapping
export default employeesEventsMappingSlice.reducer