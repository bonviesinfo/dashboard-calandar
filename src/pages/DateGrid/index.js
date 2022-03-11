import React, { useState, } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import BottomFab from '../../components/DateGrid/BottomFab'
import BottomDrawer from '../../components/DateGrid/BottomDrawer'
import MainGrid from '../../components/DateGrid/MainGrid'
import PropsDatePicker from '../../components/UI/PropsDatePicker'

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { getZeroTime } from '../../utils/timeUtils'

// import { replaceEmployeeEvents, filterEventByDate, selectEmployeeEvents } from '../../slices/employeesEventsSlice'

const DateGrid = () => {
  const theme = useTheme()
  const [bottomOpen, setBottomOpen] = useState(false)
  const [selectDate, setSelectDate] = useState(getZeroTime())

  const handleDateChangeConfirm = (date) => { }

  const backToToday = () => {
    setSelectDate(getZeroTime())
  }

  const toNextDay = () => {
    setSelectDate(new Date(selectDate.getTime() + 86400000))
  }

  const toPrevDay = () => {
    setSelectDate(new Date(selectDate.getTime() - 86400000))
  }


  // 底下抽屜相關
  const toggleBottomDrawer = () => {
    setBottomOpen(!bottomOpen)
  }

  return (
    <Box
      sx={{
        // py: { xs: 2, sm: 3 },
        overflowX: 'hidden',
        bgcolor: 'text.light',
        userSelect: 'none',
        position: 'relative',
        '& .event-card': {
          zIndex: 4,
          boxShadow: 2,
          borderRadius: 3,
          width: '80%',
          display: 'flex',
        },
        '& .card-container': {
          width: '100%',
          bgcolor: alpha(theme.palette.primary.dark, 0.03),
          display: 'flex',
          flexDirection: 'column',
        },
        '& .content': {
          pt: 1.5,
          px: 1.5,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        },
        '& .chip': {
          ml: 1.5,
          letterSpacing: '0.1em',
          color: 'background.default',
          bgcolor: 'success.light',
        },
        '& .avatar': {
          width: '100%',
          height: 108,
          mt: 2,
          mb: 2,
          '&.small': {
            mb: 0,
          },
        },
        '& .actions': {
          py: 1,
          px: 1.5,
          bgcolor: theme.palette.text.light,
          '&.small': {
            py: 0,
          },
        },
        '& .edit-btn': {
          color: theme.palette.jewelry.darkBlue,
        },
        '& .delete-btn': {
          color: theme.palette.jewelry.darkRed,
        },
        '& .MuiTypography-root': {
          color: 'text.secondary',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Box sx={{ py: 1, bgcolor: 'background.default' }}>
          <Box className="date-picker-container" sx={{ m: '0 auto', width: '95%', display: 'flex', justifyContent: 'flex-end', }}>
            <IconButton sx={{ mr: 3 }} onClick={toPrevDay}>
              <ArrowBackIosRoundedIcon />
            </IconButton>

            <Button
              variant="contained"
              disableElevation
              onClick={backToToday}
              sx={{
                mr: 2,
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                color: 'background.default',
              }}
            >
              回今日
            </Button>

            <PropsDatePicker
              variant="standard"
              dateValue={selectDate}
              setDateValue={setSelectDate}
              handleDateChangeConfirm={handleDateChangeConfirm}
              sx={{
                mr: 3,
                width: '11rem',
                '& .MuiInput-root': {
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.5rem',
                },
              }}
            />

            <IconButton onClick={toNextDay}>
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Box>
        </Box>

        <BottomFab
          selectDate={selectDate}
          bottomOpen={bottomOpen}
          toggleBottomDrawer={toggleBottomDrawer}
        />
        <BottomDrawer open={bottomOpen} onClose={() => setBottomOpen(false)} />

        <MainGrid selectDate={selectDate} />

      </Box>
    </Box>
  )
}

export default DateGrid