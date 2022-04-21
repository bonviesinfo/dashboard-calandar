import React, { Fragment, useState, useEffect, useMemo, useCallback, memo } from 'react'
import { omit } from 'lodash-es'
import { useTheme, alpha } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded'

import MainItem from './MainItem'
import EventCard from './EventCard'
import BottomDrawer from './BottomDrawer'

import { locateEvent, showInterval, getTimeIndex } from '../../utils/timeUtils'
import { dummyEmployeeData } from '../../data/dummyEmployeeData'
import { dummyPetReserveType } from '../../data/dummyPetData'
import { updateEmployeeEvent, deleteEmployeeEvent, toggleEmployeeEventCheckIn, selectEmployeesEvents, filterEventByDate, filterAnonymousEvent, limitEventStartEnd } from '../../slices/employeesEventsSlice'
import { replaceEmployeesEventsMapping } from '../../slices/employeesEventsMappingSlice'
import { replaceEmployeesOccupiedTime, selectEmployeesOccupiedTime } from '../../slices/employeesOccupiedTimeSlice'
import { selectEmployeesSchedule, filterSchedulesByGridStart } from '../../slices/employeesScheduleSlice'

import {
  startInterval,
  timePerHour,
  intervalMS,
  gridLength,
  startHour,
  nthNum,
} from '../../constants/dateGrid'

const maxCarouselNum = 5

const MainGrid = ({
  bottomOpen,
  selectDateMs,
  isTimeSupport,
  setCurrentEvent,
  scrollAnchor,
  setScrollAnchor,
  firstAnchorRef,
  secondAnchorRef,
  thirdAnchorRef,
}) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const originalEmployeesEvents = useSelector(selectEmployeesEvents)
  const employeesOccupiedTime = useSelector(selectEmployeesOccupiedTime)
  const originalEmployeesSchedule = useSelector(selectEmployeesSchedule)

  const [employees, setEmployees] = useState([])
  const [employeesStartTimeMapping, setEmployeesStartTimeMapping] = useState({})
  // const [scheduleMapping, setScheduleMapping] = useState({})
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [carouselMaxNum, setCarouselMaxNum] = useState(maxCarouselNum)

  useEffect(() => {
    setCarouselMaxNum(dummyEmployeeData.length > maxCarouselNum ? maxCarouselNum : 4)
  }, [])

  useEffect(() => {
    setEmployees(dummyEmployeeData)
  }, [])

  const dayOfWeek = useMemo(() => {
    const date = new Date(selectDateMs)
    const day = date.getDay()
    return day
  }, [selectDateMs])

  const carouselEmployees = useMemo(() => {
    const prevEmployees = dummyEmployeeData.slice(carouselIndex, carouselIndex + carouselMaxNum)
    if (carouselIndex + carouselMaxNum > dummyEmployeeData.length) {
      const nextEmployees = dummyEmployeeData.slice(0, carouselIndex + carouselMaxNum - dummyEmployeeData.length)
      return [...prevEmployees, ...nextEmployees]
    } else {
      return prevEmployees
    }
  }, [carouselIndex, carouselMaxNum])

  const employeesEvents = useMemo(() => (
    limitEventStartEnd(
      filterAnonymousEvent(
        filterEventByDate(originalEmployeesEvents, selectDateMs)
      ), selectDateMs)
  ), [selectDateMs, originalEmployeesEvents])

  const employeesSchedule = useMemo(() => {
    return filterSchedulesByGridStart(originalEmployeesSchedule, selectDateMs + startHour * 3600000)
  }, [selectDateMs, originalEmployeesSchedule])

  const employeesScheduleMapping = useMemo(() => {
    const newScheduleMapping = {}
    employeesSchedule.forEach(schedule => {
      newScheduleMapping[schedule.employeeId] = schedule
    })
    return newScheduleMapping
  }, [employeesSchedule])

  const petReserveTypeMapping = useMemo(() => {
    const newPetReserveTypeMapping = {}
    dummyPetReserveType.forEach((petReserveType) => {
      newPetReserveTypeMapping[petReserveType.id] = petReserveType
    })
    return newPetReserveTypeMapping
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


  // 事件處理相關
  const handleEditClick = useCallback(event => {
    setCurrentEvent(event)
  }, [setCurrentEvent])

  const handleEventDrop = (event, startTimeIndex, targetEmployeeId, anonymous) => {
    // const { id, pet, reserveType, remark } = event
    const newEvent = anonymous
      ? omit(event, ['employeeId'])
      : {
        ...omit(event, ['pseudoStart', 'pseudoEnd']),
        employeeId: targetEmployeeId,
        start: selectDateMs + startTimeIndex * intervalMS,
        end: selectDateMs + startTimeIndex * intervalMS + (event.end - event.start),
        // id,
        // pet,
        // remark,
        // reserveType,
      }

    dispatch(updateEmployeeEvent(newEvent))
  }

  const handleDeleteEvent = (event) => () => {
    dispatch(deleteEmployeeEvent(event.id))
  }

  const handleCheckInToggle = id => {
    dispatch(toggleEmployeeEventCheckIn(id))
  }

  // 日期變更相關
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

  // 滾動相關
  const secondOffsetTop = secondAnchorRef.current?.offsetTop
  const thirdOffsetTop = thirdAnchorRef.current?.offsetTop

  const onGridBodyScroll = event => {

    if (event.target.scrollTop < (secondOffsetTop - 2)) {
      (scrollAnchor !== 'first') && setScrollAnchor('first')
    } else if (event.target.scrollTop < (thirdOffsetTop - 2)) {
      (scrollAnchor !== 'second') && setScrollAnchor('second')
    } else if (event.target.scrollTop >= (thirdOffsetTop - 2)) {
      (scrollAnchor !== 'third') && setScrollAnchor('third')
    }

  }

  return (
    <Fragment>
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
            '&.unavailable': {
              bgcolor: 'text.lighter',
            },
            '&.active': {
              bgcolor: alpha(theme.palette.primary.light, 0.25),
            },
            '&.blocked': {
              bgcolor: alpha(theme.palette.text.primary, 0.2),
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
              color: 'text.mid',
            }
          },
          '& .time-sign': {
            position: 'absolute',
            top: 0,
            left: '50%',
            color: 'text.fader',
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
            onScroll={onGridBodyScroll}
            className="grid-body-container thick-scrollbar"
            sx={{
              pt: '2px',
              display: 'flex',
              position: 'relative',
              minHeight: 0,
              flexGrow: 1,
              overflowX: 'visible',
              overflowY: 'overlay',
              '& .pure-item': {
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'background.default',
                '&.unavailable': {
                  bgcolor: 'text.lighter',
                },
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
                '&.first-row': {
                  borderRight: `1px dashed ${theme.palette.text.mid}`,
                },
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
                gridTemplateRows: `60px repeat(${gridLength}, 60px)`,
                gridTemplateColumns: `4rem 3rem`,

              }}
            >
              <div className="pure-item first-row first-col" ref={firstAnchorRef}>
                .Before
              </div>
              {Array.from(new Array(gridLength)).map((item, index) => {
                const fullHour = index % timePerHour === 0 ? 'full-hour' : ''
                let ref
                switch (index / (timePerHour * 8)) {
                  case 1:
                    ref = secondAnchorRef
                    break
                  case 2:
                    ref = thirdAnchorRef
                    break
                  default:
                    ref = null
                }
                return (
                  <div key={'a' + index} className={`first-col ${fullHour}`} ref={ref}>
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
                gridTemplateRows: `60px repeat(${gridLength}, 60px)`,
                gridTemplateColumns: `repeat(${carouselEmployees.length}, minmax(270px, 1fr)) 2rem`,
              }}
            >
              {/* 網格本身 */}
              {carouselEmployees.map((employee, index) => {
                const eventStartTimeMapping = employeesStartTimeMapping[employee.id]
                const schedule = employeesScheduleMapping[employee.id]
                const scheduleStart = schedule?.startTime ? getTimeIndex(schedule.startTime) : startInterval
                const scheduleEnd = schedule?.endTime ? getTimeIndex(schedule.endTime) : (startInterval + timePerHour * 24)
                const dayOfWeekCheck = schedule?.daysOfWeek ? schedule.daysOfWeek.includes(dayOfWeek) : true

                const mainItems = Array.from(new Array(gridLength)).map((item, index) => {
                  const newIndex = index + startInterval
                  const eventInfo = eventStartTimeMapping && eventStartTimeMapping[newIndex]
                  const fullHour = index % timePerHour === 0 ? ' full-hour' : ''
                  const scheduleCheck = !schedule || !(newIndex < scheduleStart || newIndex >= scheduleEnd)
                  const unavailable = (!scheduleCheck || !dayOfWeekCheck) ? ' unavailable' : ''

                  return (
                    <MainItem
                      key={`${employee.id}ce${index}`}
                      className={`grid-item${fullHour}${unavailable}`}
                      employeesOccupiedTime={employeesOccupiedTime}
                      data-id={employee.id}
                      data-index={newIndex}
                      data-unavailable={unavailable}
                      selectDateMs={selectDateMs}
                    >
                      {eventInfo
                        ? <EventCard
                          row={eventInfo.eventLength}
                          event={eventInfo?.event}
                          handleEditClick={handleEditClick}
                          handleDelete={handleDeleteEvent(eventInfo?.event)}
                          handleEventDrop={handleEventDrop}
                          handleCheckInToggle={handleCheckInToggle}
                          petReserveTypeMapping={petReserveTypeMapping}
                        />
                        : null
                      }
                      {
                        isTimeSupport
                          ? <span className="time-sign">
                            {showInterval(index)}
                          </span>
                          : null
                      }

                    </MainItem>
                  )
                })

                return (
                  <Fragment key={`${employee.id}c${selectDateMs}`}>
                    <div
                      data-id={employee.id}
                      data-index={startInterval - 1}
                      className={`pure-item first-row`}
                    >
                      {
                        eventStartTimeMapping && eventStartTimeMapping[startInterval - 1] && (
                          <EventCard
                            row={eventStartTimeMapping[startInterval - 1].eventLength}
                            event={eventStartTimeMapping[startInterval - 1]?.event}
                            handleEditClick={handleEditClick}
                            handleEventDrop={handleEventDrop}
                            handleCheckInToggle={handleCheckInToggle}
                            handleDelete={handleDeleteEvent(eventStartTimeMapping[startInterval - 1]?.event)}
                            petReserveTypeMapping={petReserveTypeMapping}
                          />
                        )
                      }
                    </div>
                    {mainItems}
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
        selectDateMs={selectDateMs}
        handleEditClick={handleEditClick}
        handleEventDrop={handleEventDrop}
        handleDeleteEvent={handleDeleteEvent}
        handleCheckInToggle={handleCheckInToggle}
        petReserveTypeMapping={petReserveTypeMapping}
      />
    </Fragment>
  )
}

export default memo(MainGrid)

// ${(startInterval < scheduleStart) || !dayOfWeekCheck ? ' unavailable' : ''}