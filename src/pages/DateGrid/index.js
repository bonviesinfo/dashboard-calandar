import React, { useState, useRef, useMemo } from 'react'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import IOSSwitch from '../../components/UI/IOSSwitch'
import MainGrid from '../../components/DateGrid/MainGrid'
// import TopBanner from '../../components/DateGrid/TopBanner'
import BottomFab from '../../components/DateGrid/BottomFab'
import DialogEdit from '../../components/DateGrid/DialogEdit'
import FormControlLabel from '@mui/material/FormControlLabel'
import PropsDatePicker from '../../components/UI/PropsDatePicker'

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { getZeroTime } from '../../utils/timeUtils'

const numberToDayStringMapping = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
}

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
        '& .subInfo': {
          position: 'absolute',
          top: theme.spacing(-0.5),
          left: theme.spacing(-1.5),
          '& .MuiTypography-root': {
            px: 0.75,
            lineHeight: 1.5,
            fontWeight: 'bold',
            color: 'background.default',
            bgcolor: alpha(theme.palette.primary.light, 0.6),
          },
        },
        '& .right-tags': {
          position: 'absolute',
          right: 0,
          top: 8,
          weight: '30px',
          height: '100%',
          maxHeight: 'calc(100% - 16px)',
          overflowY: 'auto',
          transform: 'translate(100%)',
          // border: `1px solid ${alpha(theme.palette.text.primary, 0.15)}`,
        },
        '& .right-tag': {
          py: 0.75,
          px: 0.5,
          mb: 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomRightRadius: '20%',
          borderTopRightRadius: '20%',
          bgcolor: 'primary.main',
          borderBottom: `1px solid ${theme.palette.text.third}`,
          '& .MuiSvgIcon-root': {
            color: 'background.default',
          },
        },
        '& .event-card-wrapper': {
          zIndex: 4,
          pb: '3px',
          width: '80%',
          position: 'relative',
          '& .event-card': {
            height: '100%',
            boxShadow: 2,
            borderRadius: 3,
            display: 'flex',
            cursor: 'grab',
          },
          '&.dragging': {
            pointerEvents: 'none',
          },
          '&.cross .event-card': {
            boxShadow: 0,
            bgcolor: 'text.lightest',
            cursor: 'not-allowed',
            border: `2px solid ${alpha(theme.palette.primary.light, 0.7)}`,
          },
          '&.cross .event-card .MuiTypography-h5': {
            color: 'primary.dark',
          },
          '&.cross .event-card .card-container': {
            bgcolor: 'unset',
          },
          '&.check-in .event-card': {
            bgcolor: 'background.default',
          },
          '&.check-in .event-card .card-container': {
            bgcolor: alpha(theme.palette.primary.editingBg, 0.15),
          },
          '&.check-in .event-card .actions': {
            bgcolor: alpha(theme.palette.secondary.light, 0.5),
          },
          '&.check-in .right-tag': {
            bgcolor: alpha(theme.palette.secondary.main, 0.8),
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
        '& .name-title': {
          letterSpacing: '0.025em',
          alignSelf: 'flex-end',
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
          py: 0,
          px: 1.5,
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          alignItems: 'stretch',
          '&.anonymous': {
            px: 0.5,
          },
        },
        '& .edit-btn': {
          color: theme.palette.jewelry.darkBlue,
        },
        '& .delete-btn': {
          color: theme.palette.jewelry.darkRed,
        },
        '& .check-in-btn': {
          py: 0.5,
          my: 0.75,
          lineHeight: 1,
          color: 'background.default',
        },
        '& .check-in-icon-btn.cancel': {
          color: 'background.default',
        },
        '& .check-in-icon-btn .MuiSvgIcon-root': {
          fontSize: '1.5em',
        },
        '& .MuiTypography-root': {
          color: 'text.secondary',
          '&.duration-text': {
            mr: 1,
            color: 'secondary.dark',
          },
        },
      }}
    >
      {/* <TopBanner /> */}

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
                  mr: 2,
                  width: '9rem',
                  '& .MuiInput-root': {
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.5rem',
                  },
                }}
              />
              <Typography variant="h6" sx={{
                my: 'auto',
                mr: 0.5,
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                // '&.MuiTypography-root': {
                //   color: 'text.primary',
                // },
              }}>
                {numberToDayStringMapping[selectDate.getDay()]}
              </Typography>

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