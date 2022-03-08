import { configureStore } from '@reduxjs/toolkit'
import consultationsReducer from './slices/consultationsSlice'
import employeesEventsReducer from './slices/employeesEventsSlice'
import employeesEventsMappingReducer from './slices/employeesEventsMappingSlice'
import employeesOccupiedTimeReducer from './slices/employeesOccupiedTimeSlice'

export const store = configureStore({
  reducer: {
    consultations: consultationsReducer,
    employeesEvents: employeesEventsReducer,
    employeesEventsMapping: employeesEventsMappingReducer,
    employeesOccupiedTime: employeesOccupiedTimeReducer,
  },
})