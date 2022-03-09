import React, { forwardRef, useState, useMemo, Fragment } from 'react'
// import { useTheme } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
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
import DateTimePicker from '@mui/lab/DateTimePicker'
import { dummyEmployeeData } from '../../data/dummyEmployeeData'
import { dummyPetData, dummyPetReserveType } from '../../data/dummyPetData'
import AddIcon from '@mui/icons-material/Add'

import { selectEmployeesOccupiedTime } from '../../slices/employeesOccupiedTimeSlice'
import { addEmployeeEvent } from '../../slices/employeesEventsSlice'

import {
  intervalMinute,
  timePerHour,
  // startInterval,
  // intervalMS,
  // gridLength,
  // nthNum,
} from '../../constants/dateGrid'


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const DialogCreate = ({ show }) => {
  const dispatch = useDispatch()
  // const theme = useTheme()
  const employeesOccupiedTime = useSelector(selectEmployeesOccupiedTime)
  const [open, setOpen] = useState(false)
  const [selectedPet, setSelectPet] = useState(null)
  const [selectedEmployee, setSelectEmployee] = useState(null)
  const [selectedReserveType, setSelectReserveType] = useState(null)
  const [creatingItem, setCreatingItem] = useState({})

  const petMapping = useMemo(() => {
    const newPetMapping = {}
    dummyPetData.forEach((pet) => {
      newPetMapping[pet.id] = pet
    })
    return newPetMapping
  }, [])


  const onTimeChange = name => newValue => {
    setCreatingItem((prev) => ({
      ...prev,
      [name]: newValue,
    }))
  }

  const handleChange = name => e => {
    setCreatingItem((prev) => ({
      ...prev,
      [name]: e.target.value,
    }))
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handlePetChange = (event) => {
    setSelectPet(event.target.value)
  }

  const handleReserveTypeChange = (event) => {
    setSelectReserveType(event.target.value)
  }

  const handleEmployeeChange = (event) => {
    setSelectEmployee(event.target.value)
  }

  const validateTimeOccupied = () => {
    const { startTime, endTime } = creatingItem
    const startTimeIndex = startTime.getHours() * timePerHour + startTime.getMinutes() / intervalMinute
    const endTimeIndex = endTime.getHours() * timePerHour + endTime.getMinutes() / intervalMinute

    const occupiedTime = employeesOccupiedTime[selectedEmployee]
    if (occupiedTime) {
      for (let i = startTimeIndex; i < endTimeIndex; i += 1) {
        if (occupiedTime[i]) {
          return false
        }
      }
    }

    return true
  }


  const handleSubmit = () => {
    const { startTime, endTime, remark } = creatingItem
    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      pet: petMapping[selectedPet],
      employeeId: selectedEmployee,
      reserveType: selectedReserveType,
      start: new Date(startTime).getTime(),
      end: new Date(endTime).getTime(),
      remark,
    }

    if (!validateTimeOccupied()) return alert('該成員時間重複')

    dispatch(addEmployeeEvent(newEvent))
    setOpen(false)
  }


  return (
    <Fragment>
      <Button
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        // disabled={!show}
        sx={{
          mr: 2,
          // transition: theme.transitions.create('all', {
          //   easing: theme.transitions.easing.easeOut,
          //   duration: theme.transitions.duration.enteringScreen,
          // }),
          // ...(!show && { opacity: 0 }),
        }}
      >
        新增預約
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        // keepMounted
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description"
        sx={{
          zIndex: 1260,
          '& .MuiFormControl-root': {
            width: '100%',
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>新增預約</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ pt: 1 }}>

            <Grid item xs={4}>
              <TextField
                id="selected-employee"
                select
                label="服務人員"
                value={selectedEmployee || ''}
                onChange={handleEmployeeChange}
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
                value={selectedPet || ''}
                onChange={handlePetChange}
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
                {dummyPetData.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    <Typography variant="body1" noWrap>
                      {option.petName}
                    </Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* </Grid>

          <Divider light sx={{ my: 2, }} />

          <Grid container spacing={3} sx={{ pt: 1 }}> */}

            <Grid item xs={4}>
              <TextField
                id="selected-reserve-type"
                select
                label="服務類別"
                value={selectedReserveType || ''}
                onChange={handleReserveTypeChange}
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

            {/* <Grid item xs={6}></Grid> */}


            <Grid item xs={6}>
              <DateTimePicker
                renderInput={(props) => <TextField
                  variant="outlined"
                  required
                  {...props}
                // error={Boolean(errors.remindStart || props.error)} helperText={errors.remindStart} 
                />}
                openTo="hours"
                minutesStep={15}
                label="開始時間"
                value={creatingItem.startTime}
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                onChange={onTimeChange('startTime')}
              // maxDateTime={creatingItem.startTime && new Date(creatingItem.startTime)}
              />
            </Grid>

            <Grid item xs={6}>
              <DateTimePicker
                renderInput={(props) => <TextField
                  variant="outlined"
                  {...props}
                // error={Boolean(errors.remindStart || props.error)} helperText={errors.remindStart} 
                />}
                openTo="hours"
                minutesStep={15}
                label="結束時間"
                value={creatingItem.endTime}
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                onChange={onTimeChange('endTime')}
                minDateTime={creatingItem.startTime && new Date(creatingItem.startTime)}
              />
            </Grid>

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
      </Dialog>
    </Fragment>
  )
}

export default DialogCreate