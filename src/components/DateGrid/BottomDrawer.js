import React from 'react'
import Drawer from '@mui/material/Drawer'
import EventCard from './EventCard'
import { alpha } from '@mui/material/styles'

// import { alpha } from '@mui/material'

const BottomDrawer = (props) => {
  const { open, onClose, ...restProps } = props


  return (
    <Drawer
      // hideBackdrop
      variant="persistent"
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiCard-root': {
          flex: '0 0 14.5%',
          mr: '1.8%',
          mt: 5,
          mb: 4,
          '&:first-of-type': {
            ml: '1.8%',
          },
        },
        '& .MuiDrawer-paper': {
          zIndex: 1251,
          minHeight: 320,
          // bgcolor: 'secondary.bg',
          flexDirection: 'row',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0%',
            left: 0,
            width: '100%',
            height: '50%',
            zIndex: -1,
            // transform: 'Rotate(-1deg)',
            bgcolor: theme => alpha(theme.palette.primary.light, 0.1),
          },
        },
      }}
      {...restProps}
    >
      {
        Array.from(new Array(6)).map((item, index) => (
          <EventCard key={index} />
        ))
      }
    </Drawer>
  )
}

export default BottomDrawer