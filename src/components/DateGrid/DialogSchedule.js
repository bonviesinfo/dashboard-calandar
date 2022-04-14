import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { omit } from 'lodash-es'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import TimePicker from '@mui/lab/TimePicker'
import DatePicker from '@mui/lab/DatePicker'
import Transition from '../UI/TransitionSlideUp'
import { updateEmployeeSchedule, deleteEmployeeSchedule } from '../../slices/employeesScheduleSlice'
import { calcMs } from '../../data/dummyScheduleData'
import { dummyEmployeeData } from '../../data/dummyEmployeeData'
import {
  intervalMinute,
  intervalMS,
  timePerHour,
} from '../../constants/dateGrid'

const weekStringMapping = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
}

const parseObjectTrueKeyToNumArray = (obj) => {
  const result = []
  for (const key in obj) {
    if (obj[key]) {
      result.push(Number(key))
    }
  }
  return result
}


const DialogScheduleContent = ({
  handleClose,
}) => {
  const dispatch = useDispatch()

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)
  const [recurType, setRecurType] = useState('')
  const [selectedDays, setSelectedDays] = useState({})
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [selectedDuration, setSelectedDuration] = useState('')
  const [startRecur, setStartRecur] = useState(null)
  const [endRecur, setEndRecur] = useState(null)
  const [recurDuration, setRecurDuration] = useState('')
  const [errors, setErrors] = useState({})

  const handleEmployeeChange = (event) => {
    setErrors(omit(errors, 'employeeId'))
    setSelectedEmployeeId(event.target.value)
  }

  // 時間日期相關 >>
  const validateDateType = newValue => {
    if (!(newValue instanceof Date) || isNaN(newValue)) {
      return false
    }
    return true
  }

  const handleStartTimeChange = newValue => {
    setStartTime(newValue)
    if (!validateDateType(newValue)) return
    setErrors(omit(errors, 'startTime'))
    if (selectedDuration) {
      setEndTime(new Date(newValue.getTime() + Number(selectedDuration) * intervalMS))
    } else if (endTime && (endTime.getTime() < newValue.getTime())) {
      setEndTime(prev => new Date(prev.getTime() + 86400000))
    }

  }

  const handleEndTimeChange = newValue => {
    setEndTime(newValue)
    if (!validateDateType(newValue)) return
    setErrors(omit(errors, 'endTime'))
    if (selectedDuration) {
      setStartTime(new Date(newValue.getTime() - Number(selectedDuration) * intervalMS))
    } else if (startTime && (startTime.getTime() > newValue.getTime())) {
      setEndTime(new Date(newValue.getTime() + 86400000))
    }
  }

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value)
    if (startTime) {
      setEndTime(new Date(startTime.getTime() + Number(event.target.value) * intervalMS))
    }
  }

  const handleStartRecurChange = newValue => {
    setStartRecur(newValue)
    if (!validateDateType(newValue)) return
    setErrors(omit(errors, 'startRecur'))

    newValue.setHours(0, 0, 0, 0)
    setStartRecur(newValue)
    if (recurDuration) {
      const newEndRecurMs = new Date(newValue.getTime() + Number(recurDuration) * 86400000).setHours(0, 0, 1, 0)
      setEndRecur(new Date(newEndRecurMs))
    }
  }

  const handleEndRecurChange = newValue => {
    setEndRecur(newValue)
    if (!validateDateType(newValue)) return
    setErrors(omit(errors, 'endRecur'))

    newValue.setHours(0, 0, 1, 0)
    setEndRecur(newValue)

    if (recurDuration) {
      const newStartRecurMs = new Date(newValue.getTime() - Number(recurDuration) * 86400000).setHours(0, 0, 0, 0)
      setStartRecur(new Date(newStartRecurMs))
    }
  }
  // 切記在Submit前要將endRecur多加一整天!

  const handleRecurDurationChange = (event) => {
    setRecurDuration(event.target.value)
    if (startRecur) {
      const newEndRecurMs = new Date(
        startRecur.getTime() + (Number(event.target.value) - 1) * 86400000
      ).setHours(0, 0, 1, 0)
      setEndRecur(new Date(newEndRecurMs))
    }
  }
  // 時間日期相關 <<


  const handleChange = (event) => {
    setRecurType(event.target.value)
  }

  const handleCheckBoxChange = (event) => {
    selectedDays[event.target.name]
      ? setSelectedDays(omit(selectedDays, event.target.name))
      : setSelectedDays({ ...selectedDays, [event.target.name]: true })
  }

  const isAllWeekdays = Boolean(Object.keys(selectedDays).length === 5 && selectedDays[1] && selectedDays[2] && selectedDays[3] && selectedDays[4] && selectedDays[5])

  const handleWeekdaysClick = () => {
    isAllWeekdays
      ? setSelectedDays(omit(selectedDays, [1, 2, 3, 4, 5]))
      : setSelectedDays({
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
      })
  }

  const validateForm = () => {
    const newErrors = {}
    const recurCheck = Boolean(recurType)

    if (!selectedEmployeeId) newErrors.employeeId = '提醒: 必須選擇員工'
    if (recurCheck && !startTime) newErrors.startTime = '提醒: 必須選擇開始時間'
    if (startTime && !validateDateType(startTime)) newErrors.startTime = '提醒: 開始時間格式錯誤'
    if (recurCheck && !endTime) newErrors.endTime = '提醒: 必須選擇結束時間'
    if (endTime && !validateDateType(endTime)) newErrors.endTime = '提醒: 結束時間格式錯誤'

    if (startRecur && !validateDateType(startRecur)) newErrors.startRecur = '提醒:開始日期格式錯誤'
    if (endRecur && !validateDateType(endRecur)) newErrors.endRecur = '提醒: 結束時間格式錯誤'

    setErrors(newErrors)
    return Object.keys(newErrors).length > 0
  }

  console.log(errors)

  const handleSubmit = () => {
    if (validateForm()) return
    console.log('endTime', endTime)
    console.log('endRecur', endRecur)

    if (recurType === '') {
      dispatch(deleteEmployeeSchedule(selectedEmployeeId))
      return
    }

    const newSchedule = {
      employeeId: selectedEmployeeId,
      ...(startTime && { startTime: calcMs(0, startTime.getHours(), startTime.getMinutes()) }),
      ...(endTime && { endTime: calcMs(0, endTime.getHours(), endTime.getMinutes()) }),
      ...(startRecur && { startRecur: startRecur.getTime() }),
      ...(endRecur && { endRecur: endRecur.getTime() + 86400000 }),
      ...((recurType === 'week') && { daysOfWeek: parseObjectTrueKeyToNumArray(selectedDays) }),
    }

    console.log('newSchedule', newSchedule)

    dispatch(updateEmployeeSchedule(newSchedule))

    handleClose()
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
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        排班編輯
      </DialogTitle>

      <DialogContent
        sx={{
          overflow: 'initial',
          '& .MuiDivider-wrapper': {
            color: 'text.secondary',
          },
          '& .full-width': {
            width: '100%',
          },
        }}
      >
        <Grid container spacing={3} sx={{ mb: 2, }}>
          <Grid item xs={12} md={6}>
            <TextField
              id="selected-employee"
              required
              select
              label="服務人員"
              value={selectedEmployeeId || ''}
              onChange={handleEmployeeChange}
              error={!!errors.employeeId}
              helperText={errors.employeeId}
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
        </Grid>

        <Divider>重複週期</Divider>
        <Grid container sx={{ py: 0.5, color: 'text.secondary', }}>

          <Grid item xs={12} md={3}>
            <FormControlLabel className="full-width" label="None" control={
              <Radio
                checked={recurType === ''}
                onChange={handleChange}
                value=""
                name="radio-buttons"
                inputProps={{ 'aria-label': 'No recur' }}
              />
            } />
          </Grid>

          <Grid item xs={12} md={9}>
            <FormControlLabel className="full-width" label="每日" control={
              <Radio
                checked={recurType === 'everyday'}
                onChange={handleChange}
                value="everyday"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'Everyday' }}
              />
            } />
          </Grid>

          <Box>
            <FormControlLabel className="full-width" label="週次循環" control={
              <Radio
                checked={recurType === 'week'}
                onChange={handleChange}
                value="week"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'Week recur' }}
              />
            } />

            <FormControl
              component="fieldset"
              variant="standard"
              sx={{
                m: 3,
                '&.MuiFormControl-root': {
                  width: 'auto',
                  flexDirection: 'row',
                  m: 0,
                  mx: 4,
                },
                '& .MuiFormGroup-root': {
                  flexDirection: 'row',
                },
                '& .single-weekday-checkbox:first-of-type': {
                  pl: 2,
                },
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={recurType !== 'week'}
                      checked={isAllWeekdays}
                      onChange={handleWeekdaysClick}
                    />
                  }
                  label="平日"
                />
                <Divider orientation="vertical" flexItem />
                <Box display="flex">
                  {
                    Array.from(new Array(7)).map((item, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          className="single-weekday-checkbox"
                          control={
                            <Checkbox
                              disabled={recurType !== 'week'}
                              checked={Boolean(selectedDays[index])}
                              onChange={handleCheckBoxChange}
                              name={`${index}`}
                            />
                          }
                          label={weekStringMapping[index]}
                        />
                      )
                    })
                  }
                </Box>
              </FormGroup>
            </FormControl>
          </Box>
        </Grid>

        <Divider>重複時間</Divider>
        <Grid container spacing={2} sx={{ pt: 2, pb: 0.5, }}>
          <Grid item xs={12} md={4}>
            <TimePicker
              ampm={false}
              minutesStep={30}
              label="開始時刻"
              value={startTime}
              disabled={recurType === ''}
              onChange={handleStartTimeChange}
              renderInput={(props) => <TextField
                {...props}
                error={!!errors.startTime || props.error}
                helperText={errors.startTime || props.helperText}
              />}
            />
          </Grid>

          <Grid item xs={12} md={3} sx={{ position: 'relative' }}>
            <TextField
              select
              label="持續時間"
              value={selectedDuration}
              disabled={recurType === ''}
              onChange={handleDurationChange}
              // sx={{
              //   transform: theme => `translate(0, ${theme.spacing(-1.5)})`,
              // }}
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
          </Grid>

          <Grid item xs={12} md={4}>
            <TimePicker
              ampm={false}
              minutesStep={30}
              label="結束時刻"
              value={endTime}
              disabled={recurType === ''}
              onChange={handleEndTimeChange}
              renderInput={(props) => <TextField
                {...props}
                error={!!errors.endTime || props.error}
                helperText={errors.endTime || props.helperText}
              />}
            />
          </Grid>
        </Grid>
        <FormHelperText>
          若不選擇「重複時間」則表示全日可排班
        </FormHelperText>

        <Divider>日期範圍</Divider>
        <Grid container spacing={2} sx={{ pt: 2, pb: 0.5 }}>
          <Grid item xs={12} md={4}>
            <DatePicker
              label="開始日期"
              mask="____/__/__"
              maxDate={endRecur}
              value={startRecur}
              inputFormat='yyyy/MM/dd'
              disabled={recurType === ''}
              onChange={handleStartRecurChange}
              renderInput={(props) => <TextField
                {...props}
                error={!!errors.startRecur || props.error}
                helperText={errors.startRecur || props.helperText}
              />}
            />
          </Grid>

          <Grid item xs={12} md={3} sx={{ position: 'relative' }}>
            <TextField
              select
              label="持續日數"
              value={recurDuration}
              onChange={handleRecurDurationChange}
              disabled={recurType === ''}
              // sx={{
              //   transform: theme => `translate(0, ${theme.spacing(-1.5)})`,
              // }}
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
              <MenuItem value="1">1天</MenuItem>
              <MenuItem value="7">7天</MenuItem>
              <MenuItem value="30">30天</MenuItem>
            </TextField>

          </Grid>

          <Grid item xs={12} md={4}>
            <DatePicker
              label="結束日期"
              mask="____/__/__"
              minDate={startRecur}
              value={endRecur}
              inputFormat='yyyy/MM/dd'
              disabled={recurType === ''}
              onChange={handleEndRecurChange}
              renderInput={(props) => <TextField
                {...props}
                error={!!errors.endRecur || props.error}
                helperText={errors.endRecur || props.helperText}
              />}
            />
          </Grid>
        </Grid>
        <FormHelperText>
          若不選擇「日期範圍」則將無限延續。可在此單日排班，若開始與結束日期同日則表示單日排班
        </FormHelperText>

      </DialogContent>

      <DialogActions>
        <Button
          // color="inherit" 
          onClick={handleClose}>取消</Button>
        <Button
          // variant="contained" sx={{ color: 'background.default' }}
          onClick={handleSubmit}>確認</Button>
      </DialogActions>
    </Fragment>
  )
}

const DialogSchedule = ({
  open,
  handleClose,
}) => {

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      sx={{
        zIndex: 1260,
        '& .MuiFormControl-root': {
          width: '100%',
        },
      }}
    >
      <DialogScheduleContent
        handleClose={handleClose}
      />
    </Dialog>
  )
}

export default DialogSchedule