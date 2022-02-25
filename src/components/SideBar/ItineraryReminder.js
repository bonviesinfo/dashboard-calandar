import React, { useState, memo } from 'react'
import { Fab, Badge, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import ItineraryCreatePopover from './ItineraryCreatePopover'
import ItineraryListPopover from './ItineraryListPopover'

function ItineraryReminder() {
  const [listAnchorEl, setListAnchorEl] = useState(null)
  const [createAnchorEl, setCreateAnchorEl] = useState(null)

  const handleListClick = (event) => {
    setListAnchorEl(event.currentTarget)
  }

  const handleListClose = () => {
    setListAnchorEl(null)
  }

  const handleCreateClick = (event) => {
    setCreateAnchorEl(event.currentTarget)
  }

  const handleCreateClose = () => {
    setCreateAnchorEl(null)
  }

  const listOpen = Boolean(listAnchorEl)
  const createOpen = Boolean(createAnchorEl)

  return (
    <React.Fragment>
      <Box
        className='fab-wrapper'
        sx={{
          position: 'fixed',
          left: 28,
          bottom: 24,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          // 需介於1200至1300之間
          zIndex: 1250,
        }}
      >
        <Fab
          size="small"
          onClick={handleCreateClick}
          sx={{
            mb: 1.5,
            boxShadow: 1,
            bgcolor: 'background.paper',
          }}
        >
          <AddIcon sx={{ color: 'text.disabled' }} />
        </Fab>

        <Fab onClick={handleListClick}>
          <Badge
            badgeContent={'n'}
            color="primary"
            sx={{ '& .MuiBadge-badge': { color: '#ffffff' } }}
          >
            <TextSnippetIcon />
          </Badge>
        </Fab>
      </Box>

      <ItineraryCreatePopover open={createOpen} onClose={handleCreateClose} />
      <ItineraryListPopover open={listOpen} onClose={handleListClose} />
    </React.Fragment>
  )
}

export default memo(ItineraryReminder)
