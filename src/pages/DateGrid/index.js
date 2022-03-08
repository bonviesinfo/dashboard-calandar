import React, { useState, } from 'react'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BottomFab from '../../components/DateGrid/BottomFab'
import BottomDrawer from '../../components/DateGrid/BottomDrawer'
import MainGrid from '../../components/DateGrid/MainGrid'

const DateGrid = () => {
  const theme = useTheme()
  const [bottomOpen, setBottomOpen] = useState(false)

  // 底下抽屜相關
  const toggleBottomDrawer = () => {
    setBottomOpen(!bottomOpen)
  }

  return (
    <Box
      sx={{
        // py: { xs: 2, sm: 3 },
        minHeight: '100vh',
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
          '& .card-container': {
            width: '100%',
            bgcolor: alpha(theme.palette.primary.dark, 0.03),
            display: 'flex',
            flexDirection: 'column',
          },
          '& .content': {
            p: 1.5,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          },
          '& .actions': {
            px: 1.5,
            py: 1,
            bgcolor: theme.palette.text.light,
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
        },
      }}
    >
      <BottomFab
        bottomOpen={bottomOpen}
        toggleBottomDrawer={toggleBottomDrawer}
      />
      <BottomDrawer open={bottomOpen} onClose={() => setBottomOpen(false)} />
      <MainGrid />
    </Box>
  )
}

export default DateGrid