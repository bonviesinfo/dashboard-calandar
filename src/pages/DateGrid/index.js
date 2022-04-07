import React, { useState, useRef, useMemo } from 'react'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import BottomFab from '../../components/DateGrid/BottomFab'
import MainGrid from '../../components/DateGrid/MainGrid'
import PropsDatePicker from '../../components/UI/PropsDatePicker'
import IOSSwitch from '../../components/UI/IOSSwitch'
import DialogEdit from '../../components/DateGrid/DialogEdit'

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { getZeroTime } from '../../utils/timeUtils'

const DateGrid = () => {
  const theme = useTheme()
  const [bottomOpen, setBottomOpen] = useState(false)
  const [selectDate, setSelectDate] = useState(getZeroTime())
  const [currentEvent, setCurrentEvent] = useState(null)
  const [isTimeSupport, setIsTimeSupport] = useState(true)
  const [scrollAnchor, setScrollAnchor] = useState('first')

  const firstAnchorRef = useRef(null)
  const secondAnchorRef = useRef(null)
  const thirdAnchorRef = useRef(null)

  const selectDateMs = useMemo(() => selectDate.getTime(), [selectDate])

  const handleDateChangeConfirm = (date) => { }

  const handleEditClose = () => {
    setCurrentEvent(null)
  }

  const handleToggle = (event) => {
    setIsTimeSupport(event.target.checked)
  }

  const handleAnchorClick = e => {
    const value = e.target.dataset.value
    const container = document.querySelector('.grid-body-container')
    if (value === 'first') {
      container.scroll({ top: firstAnchorRef.current.offsetTop, behavior: 'smooth' })
    }
    if (value === 'second') {
      container.scroll({ top: secondAnchorRef.current.offsetTop, behavior: 'smooth' })
    }
    if (value === 'third') {
      container.scroll({ top: thirdAnchorRef.current.offsetTop, behavior: 'smooth' })
    }
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
        bgcolor: 'text.light',
        userSelect: 'none',
        position: 'relative',
        '& .event-card': {
          zIndex: 4,
          boxShadow: 2,
          borderRadius: 3,
          width: '80%',
          display: 'flex',
          cursor: 'grab',
          '&.dragging': {
            pointerEvents: 'none',
          },
          '&.cross': {
            boxShadow: 0,
            bgcolor: 'text.lightest',
            cursor: 'not-allowed',
            border: `2px solid ${alpha(theme.palette.primary.light, 0.7)}`,
          },
          '&.cross .MuiTypography-h5': {
            color: 'primary.dark',
          },
          '&.cross .card-container': {
            bgcolor: 'unset',
          },
          '&.check-in': {
            bgcolor: 'background.default',
          },
          '&.check-in .card-container': {
            bgcolor: alpha(theme.palette.primary.light, 0.2),
          },
          '&.check-in .actions': {
            bgcolor: alpha(theme.palette.secondary.light, 0.5),
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
          bgcolor: alpha(theme.palette.primary.main, 0.1),
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
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          minHeight: 0,
        }}
      >
        <Box sx={{ py: 1, bgcolor: 'background.default' }}>
          <Box className="date-picker-container" sx={{ m: '0 auto', width: '95%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            <FormGroup>
              <FormControlLabel
                control={<IOSSwitch sx={{ mr: 1 }} checked={isTimeSupport} onChange={handleToggle} />}
                label="時間格線"
              />
            </FormGroup>

            <Box display="flex">

              <DialogEdit
                selectDateMs={selectDateMs}
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
        </Box>

        <BottomFab
          selectDateMs={selectDateMs}
          bottomOpen={bottomOpen}
          scrollAnchor={scrollAnchor}
          toggleBottomDrawer={toggleBottomDrawer}
          handleAnchorClick={handleAnchorClick}
        />

        <MainGrid
          bottomOpen={bottomOpen}
          isTimeSupport={isTimeSupport}
          selectDateMs={selectDateMs}
          setCurrentEvent={setCurrentEvent}
          scrollAnchor={scrollAnchor}
          setScrollAnchor={setScrollAnchor}
          firstAnchorRef={firstAnchorRef}
          secondAnchorRef={secondAnchorRef}
          thirdAnchorRef={thirdAnchorRef}
        />


        <Box sx={{ flex: '0 0 1.5rem' }}></Box>
      </Box>
    </Box>
  )
}

export default DateGrid