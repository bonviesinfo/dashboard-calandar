import React from 'react'
import Box from '@mui/material/Box'
import { useTheme, alpha } from '@mui/material/styles'

import EventCard from './EventCard'

function EventList() {
  const theme = useTheme()


  return (
    <Box sx={{
      px: 2,
      pt: 2,
      pb: 4,
      mb: 2,
      position: 'relative',
      borderRadius: 1,
      bgcolor: alpha(theme.palette.primary.light, 0.1),
      '& .MuiPaper-root:not(:last-of-type)': {
        mb: 2,
      },
      '& .MuiCardHeader-content': {
        minWidth: 0,
      },
      '& .MuiCardHeader-action': {
        display: 'flex',
        flexDirection: 'column',
      },
      '& .card-content': {
        px: 2,
        pb: 2,
      },
      // '& .delete-btn': {
      //   top: 0,
      //   right: 0,
      //   position: 'absolute',
      //   transform: 'translate(-25%, 0%)',
      // },
    }}>
      <EventCard />
      <EventCard />
      <EventCard />
    </Box>
  )
}

export default EventList
