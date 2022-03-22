import { createSlice } from '@reduxjs/toolkit'
import { locateEvent } from '../utils/timeUtils'

const initialState = {}

export const getOneEmployeeOccupiedTime = (filteredEvents, selectDateMs) => {
  const occupiedTime = {}
  filteredEvents.forEach(event => {
    const {
      eventStartIndex,
      eventEndIndex,
    } = locateEvent(event, selectDateMs)

    for (let i = eventStartIndex; i <= eventEndIndex; i++) {
      occupiedTime[i] = event.id
    }
  })

  return occupiedTime
}

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