import React, { useState, useEffect } from 'react'
// import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { dummyEvents } from './dummyData'

import EventList from './EventList'
import EventPool from './EventPool'
import EventPopover from './EventPopover'

const DemoApp = () => {
  // const theme = useTheme()
  const [events, setEvents] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentEvent, setCurrentEvent] = useState({})
  console.log(currentEvent)

  useEffect(() => {
    setEvents(dummyEvents)
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
        events={events}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        drop={function (info) {
          info.draggedEl.parentNode.removeChild(info.draggedEl);
        }}
        eventClick={handleClick}
        eventMouseLeave={() => console.log('leave')}
      />
    </Box >
  )

}

export default DemoApp


