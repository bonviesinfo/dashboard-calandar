import React, { forwardRef, useState, Fragment } from 'react'
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { dummyPetData } from '../../data/dummyPetData'
import AddIcon from '@mui/icons-material/Add'

const dummyReserveType = [
  {
    id: 'tt1',
    name: '洗澡',
  },
  {
    id: 'tt2',
    name: '美容',
  },
]

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const DialogCreate = ({ show }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [selectedPet, setSelectPet] = useState(null)
  const [selectedReserveType, setSelectReserveType] = useState(null)
  const [creatingItem, setCreatingItem] = useState({})


  const onTimeChange = name => newValue => {
    setCreatingItem((prev) => ({
      ...prev,
      [name]: newValue,
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


  return (
    <Fragment>
      <Button
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        disabled={!show}
        sx={{
          mr: 2,
          transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          ...(!show && { opacity: 0 }),
        }}
      >
        新增預約
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
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
        <DialogContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid item xs={6}>
              <TextField
                id="outlined-select-currency"
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

            <Grid item xs={6}>
              <TextField
                id="outlined-select-currency"
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
                {dummyReserveType.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    <Typography variant="body1" noWrap>
                      {option.name}
                    </Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>


            <Grid item xs={6}>
              <DateTimePicker
                renderInput={(props) => <TextField
                  variant="outlined"
                  required
                  {...props}
                // error={Boolean(errors.remindStart || props.error)} helperText={errors.remindStart} 
                />}
                minutesStep={5}
                label="提醒開始時間"
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
                minutesStep={5}
                label="提醒結束時間"
                value={creatingItem.endTime}
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                onChange={onTimeChange('endTime')}
              // maxDateTime={creatingItem.endTime && new Date(creatingItem.endTime)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                multiline
                minRows={3}
                label="備註"
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleClose}>確認</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogCreate