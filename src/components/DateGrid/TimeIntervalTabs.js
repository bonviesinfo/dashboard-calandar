import React, { useState } from 'react'
import { alpha } from '@mui/material/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'

// import Typography from '@mui/material/Typography'
// import Stack from '@mui/material/Stack'

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const TimeIntervalTabs = ({ sx, bottomOpen, ...restProps }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }


  return (
    <Tabs
      // orientation="vertical"
      // variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 5,
        bgcolor: 'background.default',
        border: theme => `3px solid ${alpha(theme.palette.primary.light, 0.3)}`,
        zIndex: 1252,
        display: 'flex',
        alignItems: 'center',
        left: '3rem',
        position: 'fixed',
        bottom: bottomOpen ? 'calc(180px - 1.25rem)' : '2.5rem',
        transition: theme => theme.transitions.create('bottom', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiTab-root': {
          py: 0.5,
          fontWeight: 'bold',
        },
        ...sx
      }}
      {...restProps}
    >
      <Tab
        {...a11yProps(0)}
        label={
          '06:00 ~ 14:00'
          // <Stack>
          //   <div>1</div>
          //   <div>1</div>
          //   <div>1</div>
          // </Stack>
        }
      />

      <Divider orientation="vertical" flexItem />

      <Tab
        {...a11yProps(1)}
        label={
          '14:00 ~ 22:00'
          // <Stack>
          //   <div>2</div>
          //   <div>2</div>
          //   <div>2</div>
          // </Stack>
        }
      />

      <Divider orientation="vertical" flexItem />

      <Tab
        {...a11yProps(2)}
        label={
          '22:00 ~ 6:00'
          // <Stack>
          //   <div>3</div>
          //   <div>3</div>
          //   <div>3</div>
          // </Stack>
        }
      />
    </Tabs>
  )
}

export default TimeIntervalTabs