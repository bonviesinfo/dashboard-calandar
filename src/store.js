import { configureStore } from '@reduxjs/toolkit'
import oauthReducer from './slices/oauthSlice'
import consultationsReducer from './slices/consultationsSlice'
import employeesEventsReducer from './slices/employeesEventsSlice'
import employeesEventsMappingReducer from './slices/employeesEventsMappingSlice'
import employeesOccupiedTimeReducer from './slices/employeesOccupiedTimeSlice'
import employeesScheduleReducer from './slices/employeesScheduleSlice'

export const store = configureStore({
  reducer: {
    oauth: oauthReducer,
    consultations: consultationsReducer,
    employeesEvents: employeesEventsReducer,
    employeesEventsMapping: employeesEventsMappingReducer,
    employeesOccupiedTime: employeesOccupiedTimeReducer,
    employeesSchedule: employeesScheduleReducer,
  },
})