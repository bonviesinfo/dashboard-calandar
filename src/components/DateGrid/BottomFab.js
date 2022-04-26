import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTheme, alpha } from '@mui/material/styles'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DialogEdit from './DialogEdit'
import DialogSchedule from './DialogSchedule'
import AddIcon from '@mui/icons-material/Add'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'

import { showInterval } from '../../utils/timeUtils'
import { timePerHour } from '../../constants/dateGrid'

const BottomFab = ({
  selectDateMs,
  bottomOpen,
  scrollAnchor,
  toggleBottomDrawer,
  handleAnchorClick,
}) => {
  const theme = useTheme()

  const [open, setOpen] = useState(false)
  const [scheduleOpen, setScheduleOpen] = useState(false)


  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleScheduleOpen = () => {
    setScheduleOpen(true)
  }

  const handleScheduleClose = () => {
    setScheduleOpen(false)
  }

  return (
    <Box
      sx={{
        zIndex: 1252,
        display: 'flex',
        alignItems: 'center',
        right: '3rem',
        position: 'fixed',
        bottom: bottomOpen ? 'calc(210px - 1.25rem)' : '2.5rem',
        transition: theme.transitions.create('bottom', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiButton-root:not(.anchor-btn), .MuiIconButton-root': {
          px: 2,
          boxShadow: 0,
          borderRadius: 5,
          bgcolor: 'background.default',
          border: `3px solid ${alpha(theme.palette.primary.light, 0.3)}`,
          '&:hover': {
            bgcolor: 'background.default',
          },
        },
      }}
    >

      <Button
        startIcon={<EventNoteRoundedIcon />}
        onClick={handleScheduleOpen}
        sx={{
          mr: 2,
        }}
      >
        排班編輯
      </Button>

      <DialogSchedule
        open={scheduleOpen}
        handleClose={handleScheduleClose}
      />


      <Button
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{
          mr: 2,
        }}
      >
        新增預約
      </Button>

      <DialogEdit
        open={open}
        selectDateMs={selectDateMs}
        handleClose={handleClose}
      />

      <Button
        disableRipple
        size="medium"
        className="drawer-fab"
        onClick={toggleBottomDrawer}
        startIcon={<KeyboardArrowUpIcon />}
        sx={{
          // mr: 2,
          '& svg': {
            transition: theme.transitions.create('transform', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...(bottomOpen && { transform: 'rotateX(180deg)' }),
          }
        }}
      >
        待分配池
      </Button>

      <Stack sx={{
        zIndex: 20,
        right: 3,
        bottom: '3rem',
        position: 'absolute',
        '& .MuiButton-root': {
          mb: 2,
          '&.active': {
            color: 'background.default',
            bgcolor: alpha(theme.palette.primary.light, 1),
          },
        },
      }}>
        <Button className={`anchor-btn${scrollAnchor === 'first' ? ' active' : ''}`} variant="outlined" disableElevation onClick={handleAnchorClick} data-value="first">{showInterval(0)}</Button>
        <Button className={`anchor-btn${scrollAnchor === 'second' ? ' active' : ''}`} variant="outlined" disableElevation key="two" onClick={handleAnchorClick} data-value="second">{showInterval(8 * timePerHour)}</Button>
        <Button className={`anchor-btn${scrollAnchor === 'third' ? ' active' : ''}`} variant="outlined" disableElevation key="three" onClick={handleAnchorClick} data-value="third">{showInterval(16 * timePerHour)}</Button>
      </Stack>

    </Box>
  )
}

export default BottomFab