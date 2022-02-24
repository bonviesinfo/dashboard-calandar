import React from 'react'
import Paper from '@mui/material/Paper'
import Popover from '@mui/material/Popover'

function EventPopover(props) {
  const { currentEvent, ...other } = props
  const {
    title,
    start,
    end,
  } = currentEvent

  return (
    <Popover
      {...other}
    >
      <Paper sx={{ p: 1, zIndex: 100, }}>
        <div>
          {title || ''}
        </div>
        <div>
          {start && new Date(start).toLocaleDateString()}
        </div>
        <div>
          {end && new Date(end).toLocaleDateString()}
        </div>
      </Paper>
    </Popover>
  )
}

export default EventPopover;
