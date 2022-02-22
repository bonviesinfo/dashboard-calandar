import { configureStore } from '@reduxjs/toolkit'
import consultationsReducer from './slices/consultationsSlice'

export const store = configureStore({
  reducer: {
    consultations: consultationsReducer,
  },
})