import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import { Draggable } from '@fullcalendar/interaction'
import { useTheme } from '@mui/material/styles'


function EventPool(props) {
  const { sx } = props
  const theme = useTheme()

  useEffect(() => {
    new Draggable(document.querySelector('.drag-wrapper'), {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    })
  }, [])


  return (
    <Box className="drag-wrapper" sx={{
      ...sx,
      px: 3,
    }}>
      <div className="fc-event-wrapper">
        <div
          className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event"
          style={{
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.text.light,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <span>123</span>
        </div>
      </div>

      <div className="fc-event-wrapper">
        <div
          className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event"
          style={{
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.text.light,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <span>456</span>
        </div>
      </div>
    </Box>
  )
}

export default EventPool
