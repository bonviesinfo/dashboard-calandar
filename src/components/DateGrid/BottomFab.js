import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
// import Fab from '@mui/material/Fab'
import { useTheme, alpha } from '@mui/material/styles'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DialogCreate from './DialogCreate'


const BottomFab = ({
  bottomOpen,
  toggleBottomDrawer,
}) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        zIndex: 1252,
        right: '3rem',
        position: 'fixed',
        bottom: bottomOpen ? 'calc(240px - 20px)' : '2.5rem',
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

      <DialogCreate show={!bottomOpen} />

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