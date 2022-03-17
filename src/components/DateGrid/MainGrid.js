import React, { Fragment, useState, useEffect, useMemo, useCallback, memo } from 'react'
import { useTheme, alpha } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EventCard from './EventCard'
import MainItem from './MainItem'

import { dummyEmployeeData } from '../../data/dummyEmployeeData'
import { dummyPetReserveType } from '../../data/dummyPetData'
import { updateEmployeeEvent, deleteEmployeeEvent, selectEmployeeEvents, filterEventByDate } from '../../slices/employeesEventsSlice'
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

const MainGrid = ({
  selectDate,
  setCurrentEvent,
  locateEvent,
}) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const originalEmployeesEvents = useSelector(selectEmployeeEvents)
  const [employees, setEmployees] = useState([])
  const [employeesStartTimeMapping, setEmployeesStartTimeMapping] = useState({})

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

    // 每個成員被占據的時間表與開始時間表
    const employeesOccupiedTime = {}
    const employeesStartTimeMapping = {}

    Object.keys(newEmployeesEventsMapping).forEach(employeeId => {
      const occupiedTime = {}
      const startTimeMapping = {}

      const events = newEmployeesEventsMapping[employeeId]
      events.forEach(event => {
        // const startTimeIndex = new Date(event.start).getHours() * timePerHour + Math.ceil(new Date(event.start).getMinutes() / intervalMinute)
        // const endTimeIndex = new Date(event.end).getHours() * timePerHour + Math.ceil(new Date(event.end).getMinutes() / intervalMinute)

        const {
          eventStartIndex,
          eventLength,
          eventEndIndex,
        } = locateEvent(event)

        for (let i = eventStartIndex; i < eventEndIndex; i++) {
          occupiedTime[i] = event.id
        }

        startTimeMapping[eventStartIndex] = {
          eventLength,
          event,
        }
      })
      employeesOccupiedTime[employeeId] = occupiedTime
      employeesStartTimeMapping[employeeId] = startTimeMapping
    })

    setEmployeesStartTimeMapping(employeesStartTimeMapping)
    dispatch(replaceEmployeesEventsMapping(newEmployeesEventsMapping))
    dispatch(replaceEmployeesOccupiedTime(employeesOccupiedTime))

  }, [employees, employeesEvents, locateEvent, dispatch])

  const handleEditClick = useCallback(event => {
    setCurrentEvent(event)
  }, [setCurrentEvent])

  const handleDeleteEvent = (event) => () => {
    dispatch(deleteEmployeeEvent(event.id))
  }

  const handleEventDrop = (event, startTimeIndex, targetEmployeeId) => {
    const newEvent = {
      ...event,
      start: selectDateMs + startTimeIndex * intervalMS,
      end: selectDateMs + startTimeIndex * intervalMS + (event.end - event.start),
      employeeId: targetEmployeeId,
    }

    dispatch(updateEmployeeEvent(newEvent))
  }


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
          justifyContent: 'center',
          position: 'relative',
          bgcolor: 'background.default',
          borderTop: `1px solid ${theme.palette.text.fadest}`,
          '&.active': {
            bgcolor: alpha(theme.palette.primary.light, 0.1),
          },
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
            justifyContent: 'center',
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
        id="grid-body"
        sx={{
          pb: 5,
          position: 'relative',
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
          const eventStartTimeMapping = employeesStartTimeMapping[employee.id]
          const restItems = Array.from(new Array(gridLength)).map((item, index) => {
            const newIndex = index + startInterval
            const eventInfo = eventStartTimeMapping && eventStartTimeMapping[newIndex]

            // const startTimestamp = selectDateMs + newIndex * intervalMS
            const fullHour = index % timePerHour === 0 ? ' full-hour' : ''
            // const active = (new Date(employee.start).getTime() <= startTimestamp && new Date(employee.end).getTime() > startTimestamp)
            //   ? ' active'
            //   : ''

            return (
              <MainItem
                key={`dc${index}`}
                className={`grid-item${fullHour}`}
                data-id={employee.id}
                data-index={newIndex}
              >
                {eventInfo
                  ? <EventCard
                    row={eventInfo.eventLength}
                    pet={eventInfo?.event?.pet}
                    event={eventInfo?.event}
                    handleEditClick={handleEditClick}
                    handleDelete={handleDeleteEvent(eventInfo?.event)}
                    handleEventDrop={handleEventDrop}
                    petReserveTypeMapping={petReserveTypeMapping}
                  />
                  : null
                }
              </MainItem>
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




  // const appendEvents = useCallback((events) => {
  //   return events.forEach(event => {
  //     const {
  //       eventStartIndex,
  //       eventLength,
  //     } = locateEvent(event)

  //     const targetDOM = document.querySelector(`[data-id="${event.employeeId}"][data-index="${eventStartIndex}"]`)

  //     targetDOM && reactDom.render(<EventCard
  //       row={eventLength}
  //       pet={event.pet}
  //       event={event}
  //       handleEditClick={handleEditClick}
  //       handleDelete={handleDeleteEvent(event)}
  //       petReserveTypeMapping={petReserveTypeMapping}
  //     />, targetDOM)
  //   })
  // }, [locateEvent, handleDeleteEvent, petReserveTypeMapping, handleEditClick])

  // useEffect(() => {

  //   appendEvents(employeesEvents)

  // }, [employeesEvents, appendEvents])

  // const positionedEvents = useMemo(() => {
  //   const gridBody = document.querySelector('#grid-body')
  //   const left = gridBody ? gridBody.getBoundingClientRect().left : 0
  //   const top = gridBody ? gridBody.getBoundingClientRect().top : 0

  //   return employeesEvents.map(event => {
  //     const {
  //       eventStartIndex,
  //       eventLength,
  //     } = locateEvent(event)

  //     const targetDOM = document.querySelector(`[data-id="${event.employeeId}"][data-index="${eventStartIndex}"]`)

  //     if (!targetDOM) return null

  //     const targetRec = targetDOM.getBoundingClientRect()
  //     console.log(targetRec.left)
  //     const result = targetDOM
  //       ? <EventCard
  //         key={event.id}
  //         style={{
  //           width: targetRec.width * 0.8,
  //           top: targetRec.top - top,
  //           left: targetRec.left - left,
  //         }}
  //         row={eventLength}
  //         pet={event.pet}
  //         event={event}
  //         handleEditClick={handleEditClick}
  //         handleDelete={handleDeleteEvent(event)}
  //         petReserveTypeMapping={petReserveTypeMapping}
  //       />
  //       : null

  //     return result
  //   })
  // })
