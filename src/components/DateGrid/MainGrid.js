import React, { Fragment, useState, useEffect, useMemo, useCallback, memo } from 'react'
import { omit } from 'lodash-es'
import { useTheme, alpha } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded'
// import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import BottomDrawer from './BottomDrawer'
import EventCard from './EventCard'
import MainItem from './MainItem'

import { locateEvent } from '../../utils/timeUtils'
import { dummyEmployeeData } from '../../data/dummyEmployeeData'
import { dummyPetReserveType } from '../../data/dummyPetData'
import { updateEmployeeEvent, deleteEmployeeEvent, selectEmployeeEvents, filterEventByDate, filterAnonymousEvent } from '../../slices/employeesEventsSlice'
import { replaceEmployeesEventsMapping } from '../../slices/employeesEventsMappingSlice'
import { replaceEmployeesOccupiedTime, selectEmployeesOccupiedTime } from '../../slices/employeesOccupiedTimeSlice'

import {
  intervalMinute,
  timePerHour,
  startInterval,
  intervalMS,
  gridLength,
  nthNum,
} from '../../constants/dateGrid'

const maxCarouselNum = 5

const showInterval = index => {
  const newIndex = index + startInterval
  const quo = Math.floor(newIndex / timePerHour)
  const rem = index % timePerHour
  const hour = (quo >= 24) ? (quo - 24).toString().padStart(2, '0') : quo.toString().padStart(2, '0')
  const min = (rem * intervalMinute).toString().padStart(2, '0')

  return `${hour}:${min}`
}

const MainGrid = ({
  bottomOpen,
  setCurrentEvent,
  selectDateMs,
}) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const originalEmployeesEvents = useSelector(selectEmployeeEvents)
  const employeesOccupiedTime = useSelector(selectEmployeesOccupiedTime)

  const [employees, setEmployees] = useState([])
  const [employeesStartTimeMapping, setEmployeesStartTimeMapping] = useState({})
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [carouselMaxNum, setCarouselMaxNum] = useState(maxCarouselNum)


  const carouselEmployees = useMemo(() => {
    const prevEmployees = dummyEmployeeData.slice(carouselIndex, carouselIndex + carouselMaxNum)
    if (carouselIndex + carouselMaxNum > dummyEmployeeData.length) {
      const nextEmployees = dummyEmployeeData.slice(0, carouselIndex + carouselMaxNum - dummyEmployeeData.length)
      return [...prevEmployees, ...nextEmployees]
    } else {
      return prevEmployees
    }
  }, [carouselIndex, carouselMaxNum])


  const employeesEvents = useMemo(() => filterAnonymousEvent(filterEventByDate(originalEmployeesEvents, selectDateMs)), [selectDateMs, originalEmployeesEvents])
  const petReserveTypeMapping = useMemo(() => {
    const newPetReserveTypeMapping = {}
    dummyPetReserveType.forEach((petReserveType) => {
      newPetReserveTypeMapping[petReserveType.id] = petReserveType
    })
    return newPetReserveTypeMapping
  }, [])

  useEffect(() => {
    setCarouselMaxNum(dummyEmployeeData.length > maxCarouselNum ? maxCarouselNum : 4)
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
        const {
          eventStartIndex,
          eventLength,
          eventEndIndex,
        } = locateEvent(event, selectDateMs)

        for (let i = eventStartIndex; i <= eventEndIndex; i++) {
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

  }, [employees, employeesEvents, selectDateMs, dispatch])

  const handleEditClick = useCallback(event => {
    setCurrentEvent(event)
  }, [setCurrentEvent])

  const handleDeleteEvent = (event) => () => {
    dispatch(deleteEmployeeEvent(event.id))
  }

  const handleEventDrop = (event, startTimeIndex, targetEmployeeId, anonymous) => {
    const newEvent = anonymous
      ? omit(event, ['employeeId'])
      : {
        ...event,
        start: selectDateMs + startTimeIndex * intervalMS,
        end: selectDateMs + startTimeIndex * intervalMS + (event.end - event.start),
        employeeId: targetEmployeeId,
      }

    dispatch(updateEmployeeEvent(newEvent))
  }

  const onPrevClick = () => {
    if (carouselIndex <= 0) {
      setCarouselIndex(dummyEmployeeData.length - 1)
    } else {
      setCarouselIndex(carouselIndex - 1)
    }
  }

  const onNextClick = () => {
    if (carouselIndex >= dummyEmployeeData.length - 1) {
      setCarouselIndex(0)
    } else {
      setCarouselIndex(carouselIndex + 1)
    }
  }


  return (
    <>
      <Box
        className="grid-container"
        sx={{
          zIndex: 10,
          width: '95%',
          m: '0 auto',
          flexGrow: 1,
          minHeight: 0,
          display: 'flex',
          position: 'relative',
          overflowX: 'overlay',
          scrollSnapType: 'x mandatory',
          transform: 'rotateX(180deg)',
          '& .grid-item': {
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            bgcolor: 'background.default',
            borderTop: `1px solid ${theme.palette.text.fadest}`,
            '&.active': {
              bgcolor: alpha(theme.palette.primary.light, 0.1),
            },
            '&.blocked': {
              bgcolor: alpha(theme.palette.text.primary, 0.1),
            },
            '&.full-hour': {
              borderTop: `2px solid ${theme.palette.text.fade}`,
            },
            [`&:not(:nth-of-type(n + ${nthNum}))::before`]: {
              content: '"."',
              zIndex: 2,
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translate(50%, -50%)',
              color: 'text.fade',
            }
          },
          '& .time-sign': {
            position: 'absolute',
            top: 0,
            left: '50%',
            color: 'text.fade',
            transform: 'translate(-50%, -50%)',
            fontSize: '0.75rem',
          },
        }}
      >

        <Box
          className="scroll-container"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            flexGrow: 1,
            overflowX: 'visible',
            transform: 'rotateX(180deg)',
            '& .carousel-btn': {
              position: 'absolute',
              left: '4rem',
              top: '3.5rem',
              zIndex: 100,
              transform: 'translate(0, -50%) rotateY(180deg)',
              '&.right-btn': {
                right: 0,
                left: 'unset',
                transform: 'translate(0, -50%)',
              },
            },
          }}
        >

          <IconButton className="carousel-btn left-btn" onClick={onPrevClick} size="large">
            <ForwardRoundedIcon fontSize="large" />
          </IconButton>

          <IconButton className="carousel-btn right-btn" onClick={onNextClick} size="large">
            <ForwardRoundedIcon fontSize="large" />
          </IconButton>
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              left: 0,
              zIndex: 10,
              flex: '0 0 7rem',
            }}
          >

            {/* Grid Header */}
            <Box
              className="grid-header"
              sx={{
                display: 'grid',
                gridTemplateColumns: `7rem repeat(${carouselEmployees.length}, minmax(270px, 1fr)) 3rem`,
                gridTemplateRows: `7rem`,
                '& > div': {
                  bgcolor: 'text.light',
                  scrollSnapAlign: 'start',
                },
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
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                  },
                },
              }}
            >
              <div />

              {carouselEmployees.map((employee, index) => (
                <div key={`${employee.id}h${index}`} className="header-item">
                  <div className="item-container">
                    <Typography variant="h4">{employee.name}</Typography>
                    <Box className="car-info">
                      <div>
                        Car-888
                      </div>

                      <Box>
                        <Typography variant="body2" sx={{ px: 0.75, mb: 0.75, bgcolor: theme => alpha(theme.palette.secondary.main, 0.2) }}>
                          tags
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                </div>
              ))}

              <div />
            </Box>
          </Box>



          {/* Grid Body */}
          <Box
            className="grid-body-container"
            sx={{
              display: 'flex',
              position: 'relative',

              minHeight: 0,
              flexGrow: 1,
              overflowX: 'visible',
              overflowY: 'overlay',

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
            <Box
              id="grid-body-time"
              sx={{
                pb: 5,
                position: 'relative',
                display: 'grid',
                gridAutoFlow: 'column',
                gridTemplateRows: `1rem repeat(${gridLength}, 60px)`,
                gridTemplateColumns: `4rem 3rem`,

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
            </Box>

            <Box
              id="grid-body"
              sx={{
                flexGrow: 1,
                pb: 5,
                position: 'relative',
                display: 'grid',
                gridAutoFlow: 'column',
                gridTemplateRows: `1rem repeat(${gridLength}, 60px)`,
                gridTemplateColumns: `repeat(${carouselEmployees.length}, minmax(270px, 1fr)) 2rem`,
              }}
            >



              {carouselEmployees.map((employee, index) => {
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
                      key={`${employee.id}dc${index}`}
                      className={`grid-item${fullHour}`}
                      employeesOccupiedTime={employeesOccupiedTime}
                      data-id={employee.id}
                      data-index={newIndex}
                      selectDateMs={selectDateMs}
                    >
                      {eventInfo
                        ? <EventCard
                          row={eventInfo.eventLength}
                          event={eventInfo?.event}
                          handleEditClick={handleEditClick}
                          handleDelete={handleDeleteEvent(eventInfo?.event)}
                          handleEventDrop={handleEventDrop}
                          petReserveTypeMapping={petReserveTypeMapping}
                        />
                        : null
                      }
                      {/* <span className="time-sign">
                        {showInterval(index)}
                      </span> */}
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




        </Box>

      </Box>

      <BottomDrawer
        open={bottomOpen}
        handleEditClick={handleEditClick}
        handleDeleteEvent={handleDeleteEvent}
        handleEventDrop={handleEventDrop}
        petReserveTypeMapping={petReserveTypeMapping}
        selectDateMs={selectDateMs}
      />
    </>
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
