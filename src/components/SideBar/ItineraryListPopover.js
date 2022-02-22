import React from 'react'
import { Popover, Button, Box } from '@mui/material'
import MyCalendarPicker from './MyCalendarPicker'
import ItineraryGroup from './ItineraryGroup'

export default function ItineraryListPopover(props) {
  const { open, onClose } = props

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 0, left: 0 }}
      // anchorEl={}
      // anchorOrigin={{
      //   vertical: 'bottom',
      //   horizontal: 'left',
      // }}
      // transformOrigin={{
      //   vertical: 'bottom',
      //   horizontal: 'left',
      // }}
      marginThreshold={0}
      PaperProps={{
        sx: {
          zIndex: 1400,
          height: '100%',
          maxHeight: '100%',
          width: 360,
          p: 2,
          bgcolor: 'rgb(253 254 255 / 75%)',
        },
      }}
    >
      <MyCalendarPicker sx={{ mb: 3 }} />
      <ItineraryGroup title="今天" data={Array.from(new Array(5))} />
      <ItineraryGroup title="明天" />
      <ItineraryGroup title="後天" />

      <Box sx={{ textAlign: 'center', pt: 3, pb: 2 }}>
        <Button
          color="secondary"
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: 'secondary.light',
            fontWeight: 'bold',
            color: 'grey.700',
            '&:hover': {
              bgcolor: 'secondary.main',
            },
          }}
        >
          取消
        </Button>
      </Box>
    </Popover>
  )
}
