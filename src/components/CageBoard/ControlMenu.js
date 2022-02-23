import React, { useState } from 'react'
import { alpha } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'


import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing'

function TransCageMenuItem({
  handleCageChange,
}) {
  const [inputSerial, setInputSerial] = useState('')

  const onSerialChange = (e) => {
    setInputSerial(e.target.value)
  }

  return (
    <MenuItem sx={{ flexWrap: 'wrap' }}>
      <ListItemIcon>
        <SyncAltIcon fontSize="small" />
      </ListItemIcon>
      <form onSubmit={e => e.preventDefault()}>
        <TextField
          variant="filled"
          autoComplete="off"
          sx={{
            flex: '1 0 auto',
            width: 60,
            '& .MuiFilledInput-input': {
              py: 0.75,
            },
          }}
          value={inputSerial}
          onChange={onSerialChange}
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          sx={{
            color: 'background.paper',
            bgcolor: theme => alpha(theme.palette.primary.main, 0.8),
          }}
          onClick={() => handleCageChange(inputSerial)}
        >
          轉籠
        </Button>
      </form>
    </MenuItem>
  )

}


function ControlMenu({
  id,
  open,
  handleClose,
  handleCageClear,
  handleCageChange,
  anchorEl,
}) {

  return (
    <Menu
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: { boxShadow: 1 },
      }}
    >
      <TransCageMenuItem handleCageChange={handleCageChange} />
      <MenuItem>
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        <ListItemText>Copy</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ContentPaste fontSize="small" />
        </ListItemIcon>
        <ListItemText>Paste</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleCageClear}>
        <ListItemIcon>
          <CallMissedOutgoingIcon fontSize="small" sx={{
            color: theme => alpha(theme.palette.primary.main, 0.8),
          }} />
        </ListItemIcon>
        <ListItemText sx={{
          color: theme => alpha(theme.palette.primary.main, 0.8),
        }}>
          出籠
        </ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default ControlMenu