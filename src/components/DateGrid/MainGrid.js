import React, { Fragment, useState, useEffect, useMemo, useCallback, memo } from 'react'
import reactDom from 'react-dom'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EventCard from './EventCard'

import { dummyEmployeeData } from '../../data/dummyEmployeeData'
import { dummyPetReserveType } from '../../data/dummyPetData'
import { selectEmployeeEvents, deleteEmployeeEvent, filterEventByDate } from '../../slices/employeesEventsSlice'
import { replaceEmployeesEventsMapping } from '../../slices/employeesEventsMappingSlice'
import { replaceEmployeesOccupiedTime } from '../../slices/employeesOccupiedTimeSlice'

import {
  intervalMinute,
  timePerHour,
  startInterval,
  intervalMS,
  gridLength,
  nthNum,
} from '../../constants/dateGrid'

const showInterval = index => {
  const newIndex = index + startInterval
  const quo = Math.floor(newIndex / timePerHour)
  const rem = index % timePerHour
  const hour = (quo >= 24) ? (quo - 24).toString().padStart(2, '0') : quo.toString().padStart(2, '0')
  const min = (rem * intervalMinute).toString().padStart(2, '0')

  return `${hour}:${min}`
}

const MainGrid = ({ selectDate }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const originalEmployeesEvents = useSelector(selectEmployeeEvents)
  const [employees, setEmployees] = useState([])
  const [currentEvent, setCurrentEvent] = useState(null)

  console.log(currentEvent)

  const selectDateMs = useMemo(() => selectDate.getTime(), [selectDate])
  const employeesEvents = useMemo(() => filterEventByDate(selectDateMs, originalEmployeesEvents), [selectDateMs, originalEmployeesEvents])

  const petReserveTypeMapping = useMemo(() => {
    const newPetReserveTypeMapping = {}
    dummyPetReserveType.forEach((petReserveType) => {
      newPetReserveTypeMapping[petReserveType.id] = petReserveType
    })
    return newPetReserveTypeMapping
  }, [])

  useEffect(() => {
    setEmployees(dummyEmployeeData)
  }, [])

  const handleEditClick = event => {
    setCurrentEvent(event)

  }

  const locateEvent = useCallback(event => {
    const eventStartMs = new Date(event.start).getTime()
    const eventEndMs = new Date(event.end).getTime()
    const eventStartIndex = Math.floor((eventStartMs - selectDateMs) / intervalMS)
    const eventEndIndex = Math.floor((eventEndMs - selectDateMs) / intervalMS)
    const eventLength = eventEndIndex - eventStartIndex

    return {
      eventStartIndex,
      eventEndIndex,
      eventLength,
    }
  }, [selectDateMs])

  const handleDeleteEvent = useCallback(event => () => {
    const {
      eventStartIndex,
    } = locateEvent(event)

    const targetDOM = document.querySelector(`[data-id="${event.employeeId}"][data-index="${eventStartIndex}"]`)

    targetDOM && reactDom.render(null, targetDOM)

    dispatch(deleteEmployeeEvent(event.id))
  }, [locateEvent, dispatch])


  const appendEvents = useCallback((events) => {
    return events.forEach(event => {
      const {
        eventStartIndex,
        eventLength,
      } = locateEvent(event)

      const targetDOM = document.querySelector(`[data-id="${event.employeeId}"][data-index="${eventStartIndex}"]`)

      targetDOM && reactDom.render(<EventCard
        row={eventLength}
        pet={event.pet}
        event={event}
        handleEditClick={handleEditClick}
        handleDelete={handleDeleteEvent(event)}
        petReserveTypeMapping={petReserveTypeMapping}
      />, targetDOM)
    })
  }, [locateEvent, handleDeleteEvent, petReserveTypeMapping])

  useEffect(() => {

    appendEvents(employeesEvents)

  }, [employeesEvents, appendEvents])



  useEffect(() => {
    // 每個成員的事件表
    const newEmployeesEventsMapping = {}
    employeesEvents.forEach(event => {
      const employee = employees.find(employee => employee.id === event.employeeId)
      if (!employee) return
      if (!newEmployeesEventsMapping[employee.id]) {
        newEmployeesEventsMapping[employee.id] = []
      }
      newEmployeesEventsMapping[employee.id].push(event)
    })

    // 每個成員被占據的時間表
    const employeesOccupiedTime = {}
    Object.keys(newEmployeesEventsMapping).forEach(employeeId => {
      const occupiedTime = {}
      const events = newEmployeesEventsMapping[employeeId]
      events.forEach(event => {
        const startTimeIndex = new Date(event.start).getHours() * timePerHour + Math.ceil(new Date(event.start).getMinutes() / intervalMinute)
        const endTimeIndex = new Date(event.end).getHours() * timePerHour + Math.ceil(new Date(event.end).getMinutes() / intervalMinute)
        for (let i = startTimeIndex; i < endTimeIndex; i++) {
          occupiedTime[i] = event.id
        }
      })
      employeesOccupiedTime[employeeId] = occupiedTime
    })


    dispatch(replaceEmployeesEventsMapping(newEmployeesEventsMapping))
    dispatch(replaceEmployeesOccupiedTime(employeesOccupiedTime))

  }, [employees, employeesEvents, dispatch])


  return (
    <Box
      className="grid-container"
      sx={{
        width: '95%',
        m: '0 auto',
        flexGrow: 1,
        minHeight: 0,
        position: 'relative',
        '& .grid-item': {
          display: 'flex',
          position: 'relative',
          bgcolor: 'background.default',
          borderTop: `1px solid ${theme.palette.text.lighter}`,
          // '&.active': {
          //   bgcolor: alpha(theme.palette.primary.light, 0.1),
          // },
          '&.full-hour': {
            borderTop: `2px solid ${theme.palette.text.fade}`,
          },
          [`&:not(:nth-of-type(n + ${nthNum}))::before`]: {
            content: '"·"',
            zIndex: 2,
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translate(50%, -50%)',
            color: 'text.fade',
          }
        },
      }}
    >
      {/* Grid Header */}
      <Box
        className="grid-header"
        sx={{
          display: 'grid',
          gridTemplateColumns: `6rem repeat(${dummyEmployeeData.length}, minmax(150px, 1fr)) 2rem`,
          gridTemplateRows: `7rem`,
          '& .header-item': {
            display: 'flex',
            '& .item-container': {
              pt: 3,
              mb: 3,
              width: '80%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              bgcolor: 'transparent',
              borderTop: 'none',
              borderBottom: `2px solid ${theme.palette.primary.light}`,
            },
            '& h4': {
              fontWeight: 'bold',
            },
            '& .car-info': {
              display: 'flex',
              justifyContent: 'space-between',
            },
          },
        }}
      >
        <div />

        {dummyEmployeeData.map((employee, index) => (
          <div key={employee.name} className="header-item">
            <div className="item-container">
              <Typography variant="h4">{employee.name}</Typography>
              <Box className="car-info">
                <div>
                  Car-888
                </div>

                <div>
                  tags
                </div>
              </Box>
            </div>
          </div>
        ))}

        <div />
      </Box>

      {/* Grid Body */}
      <Box
        sx={{
          pb: 5,
          overflowY: 'overlay',
          height: 'calc(100% - 7rem)',
          display: 'grid',
          gridTemplateColumns: `4rem 2rem repeat(${dummyEmployeeData.length}, minmax(150px, 1fr)) 2rem`,
          gridTemplateRows: `1rem repeat(${gridLength}, 60px)`,
          gridAutoFlow: 'column',
          '& .pure-item': {
            bgcolor: 'background.default',
          },
          '& .grid-item.first-row': {
            borderTop: 'none',
          },
          '& .first-col': {
            mr: '0.75rem',
            position: 'relative',
            display: 'inline-block',
            bgcolor: 'transparent',
            borderRight: `1px solid ${theme.palette.text.mid}`,
            '&:not(:first-of-type)::before': {
              zIndex: 3,
              lineHeight: 1,
              position: 'absolute',
              content: '"○"',
              top: 0,
              right: 0,
              transform: 'translate(calc(50% + 1px), -50%)',
              color: 'text.mid',
              bgcolor: 'text.light',
            },
            '& span': {
              display: 'inline-block',
              color: 'text.third',
              bgcolor: 'text.light',
              position: 'absolute',
              fontSize: '0.75rem',
              top: '-0.75rem',
              left: 0,
              zIndex: 2,
            },
          },
          '& .first-col.full-hour': {
            '& span': {
              fontWeight: 'bold',
              fontSize: '1rem',
            },
            '&::before': {
              content: '"●"',
            },
          },
        }}
      >

        <div className="pure-item first-row first-col" />
        {Array.from(new Array(gridLength)).map((item, index) => {
          const fullHour = index % timePerHour === 0 ? 'full-hour' : ''

          return (
            <div key={'a' + index} className={`first-col ${fullHour}`}>
              <span>
                {showInterval(index)}
              </span>
            </div>
          )
        })}

        <div className="pure-item first-row" />
        {Array.from(new Array(gridLength)).map((item, index) => (
          <div key={'b' + index} className="pure-item"></div>
        ))}


        {dummyEmployeeData.map((employee, index) => {
          const restItems = Array.from(new Array(gridLength)).map((item, index) => {
            const newIndex = index + startInterval
            const startTimestamp = selectDateMs + newIndex * intervalMS
            const active = (new Date(employee.start).getTime() <= startTimestamp && new Date(employee.end).getTime() > startTimestamp)
              ? ' active'
              : ''

            const fullHour = index % timePerHour === 0 ? ' full-hour' : ''

            return (
              <div
                key={`${selectDateMs}c${index}`}
                className={`grid-item${active}${fullHour}`}
                data-id={employee.id}
                data-index={newIndex}
              >
                {/* {index + 1} */}
              </div>
            )
          })

          return (
            <Fragment key={index}>
              <div className="pure-item first-row" />
              {restItems}
            </Fragment>
          )
        })}

        <div className="pure-item first-row" />
        {Array.from(new Array(gridLength)).map((item, index) => (
          <div key={'e' + index} className="pure-item"></div>
        ))}
      </Box>

    </Box>
  )
}

export default memo(MainGrid)

