import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { dummyCageData } from '../../data/dummyCageData'

import EventList from '../../components/TestCalendar/EventList'
import EventPool from '../../components/TestCalendar/EventPool'
import EventPopover from '../../components/TestCalendar/EventPopover'

const TestCalendar = () => {
  // const theme = useTheme()
  const [events, setEvents] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentEvent, setCurrentEvent] = useState({})

  useEffect(() => {
    setEvents(dummyCageData)
  }, [])

  const handleClick = (eventInfo) => {
    setAnchorEl(eventInfo.el)
    setCurrentEvent(eventInfo.event)
  }

  const handleClose = (event) => {
    setAnchorEl(null)
    setCurrentEvent({})
  }

  const open = Boolean(anchorEl)

  return (
    <Box className="calendar-page"
      sx={{
        display: 'flex',
        width: '95%',
        m: '0 auto',
        p: 2,
        '& .fc-media-screen': {
          flexGrow: 1,
          padding: 2,
          borderRadius: 1,
          bgcolor: 'background.paper',
        },
        '& .fc-event-wrapper': {
          my: 1,
        },
        '& .fc-h-event': {
          px: 1,
          borderRadius: 1,
          color: 'text.light',
          borderColor: 'primary.main',
          bgcolor: 'primary.main',
        },
      }}
    >
      <EventPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        currentEvent={currentEvent}
      >
        123
      </EventPopover>

      <Box sx={{ flex: '0 0 25%', minWidth: 0, mr: 2, }}>
        <EventList />
        <EventPool />
      </Box>
      <FullCalendar
        initialView="dayGridMonth"
        editable={true}
        droppable={true}
        aspectRatio={1.75}
        views={{
          dayGridMonth: { // name of view
            eventTimeFormat: {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            },
            // other view-specific options here
          }
        }}

        eventClick={handleClick}
        eventMouseLeave={() => console.log('leave')}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        drop={function (info) {
          info.draggedEl.parentNode.removeChild(info.draggedEl);
        }}
        events={events}
      />
    </Box >
  )

}

export default TestCalendar


