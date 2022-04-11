import React, { Fragment, useState } from 'react'
import { omit } from 'lodash-es'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TimePicker from '@mui/lab/TimePicker'
import DatePicker from '@mui/lab/DatePicker'

import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
// import RadioGroup from '@mui/material/RadioGroup'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import Transition from '../UI/TransitionSlideUp'

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

const DialogScheduleContent = ({
  handleClose,
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)
  const [recurType, setRecurType] = useState('')
  const [state, setState] = useState({})
  const [selectedDuration, setSelectedDuration] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  console.log(selectedDuration)

  const handleStartTimeChange = newValue => {
    setStartTime(newValue)
  }

  const handleEndTimeChange = newValue => {
    setEndTime(newValue)
  }

  const handleChange = (event) => {
    setRecurType(event.target.value)
  }

  const handleCheckBoxChange = (event) => {
    state[event.target.name]
      ? setState(omit(state, event.target.name))
      : setState({ ...state, [event.target.name]: true })
  }

  const isAllWeekdays = Boolean(Object.keys(state).length === 5 && state[1] && state[2] && state[3] && state[4] && state[5])

  const handleWeekdaysClick = () => {
    isAllWeekdays
      ? setState(omit(state, [1, 2, 3, 4, 5]))
      : setState({
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
      })
  }

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value)
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
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
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
                              checked={Boolean(state[index])}
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
              onChange={handleStartTimeChange}
              renderInput={(props) => <TextField
                {...props}
              />}
            />
          </Grid>

          <Grid item xs={12} md={3} sx={{ position: 'relative' }}>
            <TextField
              select
              label="持續時間"
              value={selectedDuration}
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
              onChange={handleEndTimeChange}
              renderInput={(props) => <TextField
                {...props}
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
              inputFormat='yyyy/MM/dd'
              onChange={() => { }}
              renderInput={(props) => <TextField
                {...props}
              />}
            />
          </Grid>

          <Grid item xs={12} md={3} sx={{ position: 'relative' }}>
            <TextField
              select
              label="持續日數"
              defaultValue=""
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
              onChange={() => { }}
              mask="____/__/__"
              inputFormat='yyyy/MM/dd'
              renderInput={(props) => <TextField
                {...props}
              />}
            />
          </Grid>
        </Grid>
        <FormHelperText>
          若不選擇「日期範圍」則將無限延續，也可在此單日排班
        </FormHelperText>

      </DialogContent>

      <DialogActions>
        <Button
          // color="inherit" 
          onClick={handleClose}>取消</Button>
        <Button
          // variant="contained" sx={{ color: 'background.default' }}
          onClick={() => { }}>確認</Button>
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