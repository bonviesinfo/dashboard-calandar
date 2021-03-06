import React, { memo } from 'react'
import { styled, alpha } from '@mui/material/styles'
import { Drawer as MuiDrawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import TwitterIcon from '@mui/icons-material/Twitter'
import PatternButtons from '../UI/PatternButtons'

const drawerWidth = 240

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  overflowX: 'hidden',
})

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(9)} + 1px)`,
  // },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      borderRight: 0,
      backgroundColor: '#fcfcfc',
    },

    '& .MuiList-root a': {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
    '& .MuiListItemText-root': {
      overflow: 'hidden',
    },
    '& .MuiListItemIcon-root': {
      minWidth: 0,
    },
    '& .MuiSvgIcon-root:not(.pattern-icon)': {
      fontSize: '1.5rem',
    },
    '& .MuiListItemButton-root:hover': {
      backgroundColor: alpha(theme.palette.primary.light, 0.1),
    },
    '& .MuiListItemButton-root .MuiTouchRipple-root': {
      color: 'rgb(179 197 192 / 75%)',
    },
    '& .MuiListItemButton-root:hover .MuiListItemIcon-root': {
      color: theme.palette.primary.editingText,
    },
    '&:hover': {
      // ????????????????????????????????????????????????Drawer
      // ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    },
  }),
)

function MiniDrawer() {

  return (
    <Drawer variant="permanent">
      <Stack sx={{ justifyContent: 'space-between', height: '100%', }}>
        <div>

          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              index % 2 === 0
                ? (
                  <Link to="/" key={text}>
                    <ListItemButton color="">
                      <ListItemText primary={text} />
                      <ListItemIcon>
                        <MailIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </Link>
                )
                : (
                  <Link to="/date-grid" key={text}>
                    <ListItemButton color="">
                      <ListItemText primary={text} />
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </Link>
                )
            ))}
          </List>
          <Divider />
          <List>

            <Link to="/purchase-record">
              <ListItemButton key={'Tik Tok'}>
                <ListItemText primary={'Tik Tok'} />
                <ListItemIcon>
                  <AudiotrackIcon />
                </ListItemIcon>
              </ListItemButton>
            </Link>

            <Link to="/consultation">
              <ListItemButton key={'Trash'}>
                <ListItemText primary={'Trash'} />
                <ListItemIcon>
                  <TwitterIcon />
                </ListItemIcon>
              </ListItemButton>
            </Link>

          </List>
        </div>

        <Stack sx={{ alignItems: 'flex-start', pb: 24, pl: 2 }}>
          <PatternButtons />
        </Stack>
      </Stack>


    </Drawer>
  )
}

export default memo(MiniDrawer)