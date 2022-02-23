import React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

function DisplayToggleButton({ selected, onSelected }) {

  return (
    <ToggleButtonGroup
      exclusive
      value={selected}
      onChange={onSelected}
      aria-label="display"
      sx={{
        '& .MuiToggleButton-root': {
          py: 0.5,
          px: 2,
        },
      }}
    >
      <ToggleButton value="" aria-label="all">
        全部
      </ToggleButton>
      <ToggleButton value="undone" aria-label="undone">
        未完成
      </ToggleButton>
      <ToggleButton value="done" aria-label="done">
        已完成
      </ToggleButton>
      <ToggleButton value="transferred" aria-label="transferred">
        已轉派
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default DisplayToggleButton
