import React, { useState, useMemo } from 'react'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import BottomFab from '../../components/DateGrid/BottomFab'
import MainGrid from '../../components/DateGrid/MainGrid'
import PropsDatePicker from '../../components/UI/PropsDatePicker'
import DialogEdit from '../../components/DateGrid/DialogEdit'

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { getZeroTime, locateEvent } from '../../utils/timeUtils'

const DateGrid = () => {
  const theme = useTheme()
  const [bottomOpen, setBottomOpen] = useState(false)
  const [selectDate, setSelectDate] = useState(getZeroTime())
  const [currentEvent, setCurrentEvent] = useState(null)

  const selectDateMs = useMemo(() => selectDate.getTime(), [selectDate])

  // const locateEvent = useCallback(event => {
  //   const eventStartMs = new Date(event.start).getTime()
  //   const eventEndMs = new Date(event.end).getTime()
  //   const eventStartIndex = Math.floor((eventStartMs - selectDateMs) / intervalMS)
  //   const eventEndIndex = Math.ceil((eventEndMs - selectDateMs) / intervalMS) - 1
  //   const eventLength = eventEndIndex - eventStartIndex + 1

  //   return {
  //     eventStartIndex,
  //     eventEndIndex,
  //     eventLength,
  //   }
  // }, [selectDateMs])


  const handleDateChangeConfirm = (date) => { }

  const handleEditClose = () => {
    setCurrentEvent(null)
  }

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
          '&.dragging': {
            pointerEvents: 'none',
          },
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
            mt: 1,
            mb: 0.5,
          },
        },
        '& .remark': {
          wordBreak: 'break-word',
        },
        '& .actions': {
          py: 1,
          px: 1.5,
          bgcolor: theme => alpha(theme.palette.primary.main, 0.1),
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
          '&.duration-text': {
            color: 'secondary.dark',
            // textDecoration: 'underline',
          },
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

            <DialogEdit
              selectDate={selectDate}
              currentEvent={currentEvent}
              handleClose={handleEditClose}
            />

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
          selectDateMs={selectDateMs}
          bottomOpen={bottomOpen}
          toggleBottomDrawer={toggleBottomDrawer}
        />

        <MainGrid
          bottomOpen={bottomOpen}
          locateEvent={locateEvent}
          selectDate={selectDate}
          setCurrentEvent={setCurrentEvent}
          selectDateMs={selectDateMs}
        />

      </Box>
    </Box>
  )
}

export default DateGrid