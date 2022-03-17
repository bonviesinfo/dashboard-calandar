import React, { forwardRef, useState, useMemo, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import Slide from '@mui/material/Slide'
import TimePicker from '@mui/lab/TimePicker'
import DatePicker from '@mui/lab/DatePicker'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { getZeroTime } from '../../utils/timeUtils'
import { dummyEmployeeData } from '../../data/dummyEmployeeData'
import { dummyPetData, dummyPetReserveType } from '../../data/dummyPetData'

import { selectEmployeesOccupiedTime } from '../../slices/employeesOccupiedTimeSlice'
import { addEmployeeEvent, updateEmployeeEvent } from '../../slices/employeesEventsSlice'

import {
  intervalMinute,
  timePerHour,
  startInterval,
  intervalMS,
  // gridLength,
  // nthNum,
} from '../../constants/dateGrid'

const getNearestTime = time => {
  const minute = time.getMinutes()
  const nearestMinute = Math.round(minute / intervalMinute) * intervalMinute
  const nearestTime = new Date(time)
  nearestTime.setMinutes(nearestMinute, 0, 0)
  return nearestTime
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const DialogEditContent = ({
  selectDate,
  handleClose,
  currentEvent,
  locateEvent,
}) => {
  const dispatch = useDispatch()
  const employeesOccupiedTime = useSelector(selectEmployeesOccupiedTime)

  const [creatingItem, setCreatingItem] = useState({
    ...currentEvent,
    endTime: currentEvent ? new Date(currentEvent.end) : null
  })
  const [selectedDuration, setSelectedDuration] = useState('')

  const zeroTimeMs = getZeroTime().getTime()
  const selectDateMs = selectDate.getTime()
  const selectDateStartTimeMs = selectDateMs + getNearestTime(new Date()).getTime() - zeroTimeMs

  const [startTime, setStartTime] = useState(currentEvent ? new Date(currentEvent.start) : new Date(selectDateStartTimeMs))

  const petMapping = useMemo(() => {
    const newPetMapping = {}
    dummyPetData.forEach((pet) => {
      newPetMapping[pet.id] = pet
    })
    return newPetMapping
  }, [])

  const handleChange = name => e => {
    setCreatingItem((prev) => ({
      ...prev,
      [name]: e.target.value,
    }))
  }

  const handlePetChange = (event) => {
    setCreatingItem(prev => ({
      ...prev,
      pet: petMapping[event.target.value],
    }))
  }

  const validateTimeOccupied = (editingEventId) => {
    const { endTime, employeeId } = creatingItem
    const { eventStartIndex, eventEndIndex } = locateEvent({ start: startTime, end: endTime })

    const occupiedTime = employeesOccupiedTime[employeeId]
    if (occupiedTime) {
      for (let i = eventStartIndex; i <= eventEndIndex; i += 1) {
        if (occupiedTime[i] && occupiedTime[i] !== editingEventId) {
          return false
        }
      }
    }

    return true
  }

  const validateInterval = newValue => {
    if (!(newValue instanceof Date) || isNaN(newValue) || newValue.getMinutes() % intervalMinute !== 0) {
      return false
    }
    return true
  }

  const handleSubmit = () => {
    if (!validateTimeOccupied(currentEvent?.id)) return alert('該成員時間重複')
    const { id, endTime, remark, pet, employeeId, reserveType } = creatingItem
    const newEvent = {
      id: currentEvent ? id : Math.random().toString(36).substr(2, 9),
      pet,
      employeeId,
      reserveType,
      start: startTime.getTime(),
      end: new Date(endTime).getTime(),
      remark,
    }

    currentEvent
      ? dispatch(updateEmployeeEvent(newEvent))
      : dispatch(addEmployeeEvent(newEvent))

    handleClose()
  }

  const handleStartDateChange = newValue => {
    if (!(newValue instanceof Date) || isNaN(newValue)) return
    setStartTime(newValue)

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

  const handleStartTimeChange = (newValue) => {
    if (!validateInterval(newValue)) return
    setStartTime(newValue)

    if (selectedDuration && newValue
      && (newValue instanceof Date && !isNaN(newValue))
      && newValue.getTime() + selectedDuration * intervalMS <= 86400000 + selectDateMs + startInterval * intervalMS
    ) {
      setCreatingItem((prev) => ({
        ...prev,
        endTime: new Date(newValue.getTime() + selectedDuration * intervalMS),
      }))
    } else {
      setSelectedDuration('')
      setCreatingItem((prev) => ({
        ...prev,
        endTime: null,
      }))
    }
  }

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value)
    if (startTime) {
      setCreatingItem(prev => ({
        ...prev,
        endTime: new Date(startTime.getTime() + event.target.value * intervalMS),
      }))
    }
  }

  const handleEndTimeChange = (newValue) => {
    if (!validateInterval(newValue)) return

    setCreatingItem((prev) => ({
      ...prev,
      endTime: newValue,
    }))

    if (selectedDuration && newValue
      && (newValue instanceof Date && !isNaN(newValue))
      && newValue.getTime() - selectDateMs - startInterval * intervalMS <= 86400000
    ) {
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
          {hour > 0 ? `${hour}小時` : ''}{minute > 0 ? `${minute}分鐘` : ''}
        </MenuItem>
      )
    })
  }


  return (
    <Fragment>
      <DialogTitle sx={{ fontWeight: 'bold' }}>新增預約</DialogTitle>
      <DialogContent sx={{ overflow: 'initial' }}>
        <Grid container spacing={3} sx={{ pt: 1 }}>

          <Grid item xs={4}>
            <TextField
              id="selected-employee"
              select
              label="服務人員"
              value={creatingItem?.employeeId || ''}
              onChange={handleChange('employeeId')}
              SelectProps={{
                MenuProps: {
                  sx: { '& .MuiPaper-root': { width: 0, } },
                },
              }}
            >
              {dummyEmployeeData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <Typography variant="body1" noWrap>
                    {option.name}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="selected-pet"
              select
              label="寵物"
              value={creatingItem?.pet?.id || ''}
              onChange={handlePetChange}
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

          <Grid item xs={4}>
            <TextField
              id="selected-reserve-type"
              select
              label="服務類別"
              value={creatingItem?.reserveType || ''}
              onChange={handleChange('reserveType')}
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

          <Grid item xs={3}>
            <DatePicker
              renderInput={(props) => <TextField
                variant="outlined"
                required
                {...props}
              />}
              // disabled
              // disableOpenPicker
              label="開始日期"
              inputFormat="yyyy/MM/dd"
              mask="____/__/__"
              onChange={handleStartDateChange}
              value={startTime}
            />
          </Grid>

          <Grid item xs={3}>
            <TimePicker
              ampm={false}
              minutesStep={15}
              label="開始時刻"
              value={startTime}
              onChange={handleStartTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>

          <Grid item xs={4} sx={{ position: 'relative' }}>
            <TextField
              select
              label="持續時間"
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
              ⇁
            </Box>
          </Grid>

          <Grid item xs={6}>
            <DateTimePicker
              renderInput={(props) => <TextField
                variant="outlined"
                {...props}
              />}
              ampm={false}
              openTo="hours"
              minutesStep={15}
              label="結束時間"
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
              label="備註"
              value={creatingItem.remark}
              onChange={handleChange('remark')}
            />
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={handleSubmit}>確認</Button>
      </DialogActions>
    </Fragment>
  )
}


const DialogEdit = ({
  open,
  selectDate,
  currentEvent,
  handleClose,
  locateEvent,
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
        selectDate={selectDate}
        handleClose={handleClose}
        currentEvent={currentEvent}
        locateEvent={locateEvent}
      />
    </Dialog>
  )
}

export default DialogEdit