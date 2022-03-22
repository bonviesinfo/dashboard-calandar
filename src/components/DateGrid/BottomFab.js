import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTheme, alpha } from '@mui/material/styles'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DialogEdit from './DialogEdit'
import AddIcon from '@mui/icons-material/Add'

const BottomFab = ({
  locateEvent,
  selectDateMs,
  bottomOpen,
  toggleBottomDrawer,
}) => {
  const theme = useTheme()

  const [open, setOpen] = useState(false)


  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{
        zIndex: 1252,
        display: 'flex',
        alignItems: 'center',
        right: '3rem',
        position: 'fixed',
        bottom: bottomOpen ? 'calc(180px - 1.25rem)' : '2.5rem',
        transition: theme.transitions.create('bottom', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiButton-root': {
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
        locateEvent={locateEvent}
      />

      <Button
        disableRipple
        size="medium"
        className="drawer-fab"
        onClick={toggleBottomDrawer}
        startIcon={<KeyboardArrowUpIcon />}
        sx={{
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
    </Box>
  )
}

export default BottomFab