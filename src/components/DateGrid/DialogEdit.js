import React, { useState, useMemo, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { omit } from 'lodash-es'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TimePicker from '@mui/lab/TimePicker'
import DatePicker from '@mui/lab/DatePicker'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Transition from '../UI/TransitionSlideUp'

import { getZeroTime, locateEvent } from '../../utils/timeUtils'
import { dummyEmployeeData } from '../../data/dummyEmployeeData'
import { dummyPetData, dummyPetReserveType } from '../../data/dummyPetData'

import { getOneEmployeeOccupiedTime } from '../../slices/employeesOccupiedTimeSlice'
import { selectEmployeesEvents, addEmployeeEvent, updateEmployeeEvent, filterEventBetweenMs, filterEventByEmployeeId } from '../../slices/employeesEventsSlice'

import {
  intervalMinute,
  timePerHour,
  startInterval,
  intervalMS,
} from '../../constants/dateGrid'

const getNearestTime = time => {
  const minute = time.getMinutes()
  const nearestMinute = Math.round(minute / intervalMinute) * intervalMinute
  const nearestTime = new Date(time)
  nearestTime.setMinutes(nearestMinute, 0, 0)
  return nearestTime
}

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />
// })

const DialogEditContent = ({
  selectDateMs,
  handleClose,
  currentEvent,
}) => {
  const dispatch = useDispatch()
  const originalEvents = useSelector(selectEmployeesEvents)

  const [creatingItem, setCreatingItem] = useState({
    ...currentEvent,
    endTime: currentEvent ? new Date(currentEvent.end) : null
  })
  const [errors, setErrors] = useState({})
  const [selectedDuration, setSelectedDuration] = useState('')

  const zeroTimeMs = getZeroTime().getTime()
  const selectDateStartTimeMs = selectDateMs + getNearestTime(new Date()).getTime() - zeroTimeMs
  const [startTime, setStartTime] = useState(currentEvent
    ? new Date(currentEvent.start)
    : new Date(selectDateStartTimeMs)
  )

  const petMapping = useMemo(() => {
    const newPetMapping = {}
    dummyPetData.forEach((pet) => {
      newPetMapping[pet.id] = pet
    })
    return newPetMapping
  }, [])

  const handleChange = name => e => {
    setErrors(omit(errors, name))
    setCreatingItem((prev) => ({
      ...prev,
      [name]: e.target.value,
    }))
  }

  const handlePetChange = (event) => {
    setErrors(omit(errors, 'pet'))
    setCreatingItem(prev => ({
      ...prev,
      pet: petMapping[event.target.value],
    }))
  }

  const validateTimeOccupied = (editingEventId) => {
    const { endTime, employeeId } = creatingItem
    const { eventStartIndex, eventEndIndex } = locateEvent({ start: startTime, end: endTime }, selectDateMs)

    const filteredEvents = filterEventBetweenMs(
      filterEventByEmployeeId(originalEvents, employeeId),
      startTime.getTime(),
      endTime.getTime(),
    )

    const occupiedTime = getOneEmployeeOccupiedTime(filteredEvents, selectDateMs)
    if (occupiedTime) {
      for (let i = eventStartIndex; i <= eventEndIndex; i += 1) {
        if (occupiedTime[i] && occupiedTime[i] !== editingEventId) {
          return false
        }
      }
    }

    return true
  }

  const validateIntervalAndDateType = newValue => {
    if (!(newValue instanceof Date) || isNaN(newValue) || newValue.getMinutes() % intervalMinute !== 0) {
      return false
    }
    return true
  }

  const validateInput = () => {
    const newErrors = {}
    if (!creatingItem.pet) newErrors.pet = '???????????????'
    if (!creatingItem.reserveType) newErrors.reserveType = '?????????????????????'
    if (!(startTime instanceof Date) || isNaN(startTime)) newErrors.startTime = '?????????????????????'
    if (!creatingItem.endTime) newErrors.endTime = '?????????????????????'

    setErrors(newErrors)
    return Object.keys(newErrors).length > 0
  }

  const handleSubmit = () => {
    if (validateInput()) return
    const { id, employeeId, endTime } = creatingItem
    if (employeeId && !validateTimeOccupied(id)) return alert('?????????????????????')
    const newEvent = {
      ...omit(creatingItem, ['endTime', 'employeeId', 'pseudoStart', 'pseudoEnd']),
      ...(!id && { id: Math.random().toString(36).substr(2, 9) }),
      ...(employeeId && { employeeId }),
      // id: currentEvent ? id : Math.random().toString(36).substr(2, 9),
      // pet,
      // remark,
      // reserveType,
      start: startTime.getTime(),
      end: endTime.getTime(),
    }

    currentEvent
      ? dispatch(updateEmployeeEvent(newEvent))
      : dispatch(addEmployeeEvent(newEvent))

    handleClose()
  }

  const handleStartDateChange = newValue => {
    setStartTime(newValue)

    if (!(newValue instanceof Date) || isNaN(newValue)) return
    setErrors(omit(errors, 'startTime'))

    if (creatingItem.endTime) {
      const newEndTime = new Date(newValue)
      newEndTime.setHours(creatingItem.endTime.getHours())
      newEndTime.setMinutes(creatingItem.endTime.getMinutes())
      setCreatingItem(prev => ({
        ...prev,
        endTime: newEndTime,
      }))
    }
  }

  const handleStartTimeChange = newValue => {
    setStartTime(newValue)

    if (!validateIntervalAndDateType(newValue)) return
    if (!startTime) {
      newValue.setSeconds(0, 0)
      const newSelectedDate = new Date(selectDateMs)
      newSelectedDate.setHours(newValue.getHours())
      newSelectedDate.setMinutes(newValue.getMinutes())
      setStartTime(newSelectedDate)
    }
    setErrors(omit(errors, 'startTime'))

    if (selectedDuration
      // && newValue.getTime() + selectedDuration * intervalMS <= 86400000 + selectDateMs + startInterval * intervalMS
    ) {
      setErrors(omit(errors, 'endTime'))
      setCreatingItem((prev) => ({
        ...prev,
        endTime: new Date(newValue.getTime() + selectedDuration * intervalMS),
      }))
    } else {
      setCreatingItem(prev => ({
        ...prev,
        endTime: null,
      }))
    }
  }

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value)
    if (startTime) {
      setErrors(omit(errors, 'endTime'))
      setCreatingItem(prev => ({
        ...prev,
        endTime: new Date(startTime.getTime() + event.target.value * intervalMS),
      }))
    }
  }

  const handleEndTimeChange = (newValue) => {
    if (!validateIntervalAndDateType(newValue)) return
    newValue.setSeconds(0, 0)
    setErrors(omit(errors, 'endTime'))
    setCreatingItem((prev) => ({
      ...prev,
      endTime: newValue,
    }))

    if (selectedDuration && newValue
      && (newValue instanceof Date && !isNaN(newValue))
      && newValue.getTime() - selectDateMs - startInterval * intervalMS <= 86400000
    ) {
      setErrors(omit(errors, 'startTime'))
      setStartTime(new Date(newValue.getTime() - selectedDuration * intervalMS))
    } else {
      setSelectedDuration('')
    }
  }

  const renderDurationOptions = () => {
    return Array.from({ length: 24 * timePerHour / 2 }).map((item, index) => {
      const newIndex = (index + 1) * 2
      const hour = Math.floor(newIndex / timePerHour)
      const minute = newIndex % timePerHour * intervalMinute
      return (
        <MenuItem key={newIndex} value={newIndex}>
          {hour > 0 ? `${hour}??????` : ''}{minute > 0 ? `${minute}??????` : ''}
        </MenuItem>
      )
    })
  }


  return (
    <Fragment>
      <DialogTitle sx={{ fontWeight: 'bold' }}>{currentEvent ? '????????????' : '????????????'}</DialogTitle>
      <DialogContent sx={{ overflow: 'initial' }}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={4}>
            <TextField
              id="selected-employee"
              select
              label="????????????"
              value={creatingItem?.employeeId || ''}
              onChange={handleChange('employeeId')}
              SelectProps={{
                MenuProps: {
                  sx: { '& .MuiPaper-root': { width: 0, } },
                },
              }}
            >
              <MenuItem value="">
                <Typography variant="body1" noWrap>
                  No one
                </Typography>
              </MenuItem>
              {dummyEmployeeData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <Typography variant="body1" noWrap>
                    {option.name}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              id="selected-pet"
              select
              label="??????"
              value={creatingItem?.pet?.id || ''}
              onChange={handlePetChange}
              error={Boolean(errors.pet)}
              helperText={errors.pet}
              SelectProps={{
                MenuProps: {
                  sx: { '& .MuiPaper-root': { width: 0, } },
                },
              }}
            >
              {dummyPetData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <Typography variant="body1" noWrap>
                    {option.petName}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              id="selected-reserve-type"
              select
              label="????????????"
              value={creatingItem?.reserveType || ''}
              onChange={handleChange('reserveType')}
              error={Boolean(errors.reserveType)}
              helperText={errors.reserveType}
              SelectProps={{
                MenuProps: {
                  sx: {
                    '& .MuiPaper-root': {
                      width: 0,
                    },
                  },
                },
              }}
            >
              {dummyPetReserveType.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <Typography variant="body1" noWrap>
                    {option.name}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>


        <Grid
          container
          spacing={3}
          sx={{ pt: 3 }}
          columns={16}
        >

          <Grid item xs={16} md={3}>
            <DatePicker
              renderInput={(props) => <TextField
                {...props}
                variant="outlined"
                required
                helperText={errors.startTime}
                error={Boolean(errors.startTime || props.error)}
              />}
              // disabled
              // disableOpenPicker
              label="????????????"
              inputFormat="yyyy/MM/dd"
              mask="____/__/__"
              onChange={handleStartDateChange}
              value={startTime}
            />
          </Grid>

          <Grid item xs={16} md={3}>
            <TimePicker
              ampm={false}
              minutesStep={15}
              label="????????????"
              value={startTime}
              onChange={handleStartTimeChange}
              renderInput={(props) => <TextField
                {...props}
                helperText={errors.startTime}
                error={Boolean(errors.startTime || props.error)}
              />}
            />
          </Grid>

          <Grid item xs={16} md={4} sx={{ position: 'relative' }}>
            <TextField
              select
              label="????????????"
              value={selectedDuration}
              onChange={handleDurationChange}
              sx={{
                transform: theme => `translate(0, ${theme.spacing(-1.5)})`,
              }}
              SelectProps={{
                MenuProps: {
                  sx: {
                    '& .MuiPaper-root': {
                      maxHeight: 250,
                    },
                  },
                },
              }}
            >
              <MenuItem value="">None</MenuItem>
              {renderDurationOptions()}
            </TextField>

            <Box sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: theme => `calc(100% - ${theme.spacing(3)})`,
              fontSize: '2rem',
              height: '1px',
              color: 'text.mid',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              ???
            </Box>
          </Grid>

          <Grid item xs={16} md={6}>
            <DateTimePicker
              renderInput={(props) => <TextField
                {...props}
                variant="outlined"
                helperText={errors.endTime}
                error={Boolean(errors.endTime || props.error)}
              />}
              ampm={false}
              openTo="hours"
              minutesStep={15}
              label="????????????"
              value={creatingItem.endTime}
              inputFormat="yyyy/MM/dd kk:mm"
              mask="____/__/__ __:__"
              onChange={handleEndTimeChange}
              minDateTime={startTime}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ pt: 3 }}>
          <Grid item xs={12}>
            <TextField
              multiline
              minRows={3}
              label="??????"
              value={creatingItem.remark}
              onChange={handleChange('remark')}
            />
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>??????</Button>
        <Button onClick={handleSubmit}>??????</Button>
      </DialogActions>
    </Fragment>
  )
}


const DialogEdit = ({
  open,
  selectDateMs,
  currentEvent,
  handleClose,
}) => {


  return (
    <Dialog
      open={open || Boolean(currentEvent)}
      TransitionComponent={Transition}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      aria-describedby="alert-dialog-slide-description"
      sx={{
        zIndex: 1260,
        '& .MuiFormControl-root': {
          width: '100%',
        },
      }}
    >
      <DialogEditContent
        selectDateMs={selectDateMs}
        handleClose={handleClose}
        currentEvent={currentEvent}
      />
    </Dialog>
  )
}

export default DialogEdit