import React from 'react'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'


import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing'


function ControlMenu({
  id,
  open,
  handleClose,
  handleCageClear,
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
      <MenuItem>
        <ListItemIcon>
          <ContentCut fontSize="small" />
        </ListItemIcon>
        <ListItemText>Cut</ListItemText>
        {/* <Typography variant="body2" color="text.secondary">
          ⌘X
        </Typography> */}
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        <ListItemText>Copy</ListItemText>
        {/* <Typography variant="body2" color="text.secondary">
          ⌘C
        </Typography> */}
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ContentPaste fontSize="small" />
        </ListItemIcon>
        <ListItemText>Paste</ListItemText>
        {/* <Typography variant="body2" color="text.secondary">
          ⌘V
        </Typography> */}
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleCageClear}>
        <ListItemIcon>
          <CallMissedOutgoingIcon fontSize="small" sx={{ color: 'success.light' }} />
        </ListItemIcon>
        <ListItemText sx={{ color: 'success.light' }}>出籠</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default ControlMenu