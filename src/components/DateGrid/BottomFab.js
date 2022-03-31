import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { useTheme, alpha } from '@mui/material/styles'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DialogEdit from './DialogEdit'
import AddIcon from '@mui/icons-material/Add'

import { showInterval } from '../../utils/timeUtils'
import { timePerHour } from '../../constants/dateGrid'

const BottomFab = ({
  selectDateMs,
  bottomOpen,
  scrollAnchor,
  toggleBottomDrawer,
  handleAnchorClick,
}) => {
  const theme = useTheme()

  const [open, setOpen] = useState(false)


  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // const handleAnchorChange = e => {
  //   setScrollAnchor(e.target.value)
  // }

  return (
    <Box
      sx={{
        zIndex: 1252,
        display: 'flex',
        alignItems: 'center',
        right: '3rem',
        position: 'fixed',
        bottom: bottomOpen ? 'calc(180px - 1.25rem)' : '2.5rem',
        transition: theme.transitions.create('bottom', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiButton-root, .MuiIconButton-root': {
          px: 2,
          boxShadow: 0,
          borderRadius: 5,
          bgcolor: 'background.default',
          border: `3px solid ${alpha(theme.palette.primary.light, 0.3)}`,
          '&:hover': {
            bgcolor: 'background.default',
          },
        },
      }}
    >
      <TextField select variant="standard"
        // onChange={handleAnchorChange}
        value={scrollAnchor}
        onClick={handleAnchorClick}
        sx={{
          mr: 3,
          bgcolor: 'background.default',
          '& .MuiInput-root': {
            px: 1,
            bgcolor: theme => alpha(theme.palette.primary.light, 0.2),
            color: 'text.secondary',
            fontWeight: 'bold',
            fontSize: '1.25rem',
          },
        }}
      >
        <MenuItem value="first">
          {showInterval(0)}
        </MenuItem>
        <MenuItem value="second">
          {showInterval(8 * timePerHour)}
        </MenuItem>
        <MenuItem value="third">
          {showInterval(16 * timePerHour)}
        </MenuItem>

      </TextField>

      <Button
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{
          mr: 2,
        }}
      >
        新增預約
      </Button>

      <DialogEdit
        open={open}
        selectDateMs={selectDateMs}
        handleClose={handleClose}
      />

      <Button
        disableRipple
        size="medium"
        className="drawer-fab"
        onClick={toggleBottomDrawer}
        startIcon={<KeyboardArrowUpIcon />}
        sx={{
          // mr: 2,
          '& svg': {
            transition: theme.transitions.create('transform', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...(bottomOpen && { transform: 'rotateX(180deg)' }),
          }
        }}
      >
        待分配池
      </Button>

      {/* <IconButton>
        <AddIcon />
      </IconButton> */}
    </Box>
  )
}

export default BottomFab