import React, { memo } from 'react'
import { styled } from '@mui/material/styles'
import { Drawer as MuiDrawer, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import TwitterIcon from '@mui/icons-material/Twitter'

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
    '& .MuiSvgIcon-root': {
      fontSize: '1.5rem',
    },
    '& .MuiListItemButton-root:hover': {
      backgroundColor: 'rgb(182 255 235 / 15%)',
    },
    '& .MuiListItemButton-root .MuiTouchRipple-root': {
      color: 'rgb(179 197 192 / 75%)',
    },
    '& .MuiListItemButton-root:hover .MuiListItemIcon-root': {
      color: '#3c97a4',
    },
    '&:hover': {
      // 以下取消註解變成可推擠其他內容的Drawer
      // ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    },
  }),
)

function MiniDrawer() {

  return (
    <Drawer variant="permanent">
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <Link to="/" key={text}>
            <ListItemButton color="">
              <ListItemText primary={text} />
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
            </ListItemButton>
          </Link>
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
    </Drawer>
  )
}

export default memo(MiniDrawer)