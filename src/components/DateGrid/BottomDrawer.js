import React, { memo, useMemo } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import EventCard from './EventCard'
import { useDrop } from 'react-dnd'
import { alpha } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { selectEmployeeEvents, filterEventByDate, filterAnonymousEvent, limitEventStartEnd } from '../../slices/employeesEventsSlice'

const BottomDrawer = ({
  open,
  handleEditClick,
  handleDeleteEvent,
  handleEventDrop,
  handleCheckInToggle,
  petReserveTypeMapping,
  selectDateMs,
  ...restProps
}) => {

  const originalEmployeesEvents = useSelector(selectEmployeeEvents)
  const events = useMemo(() => {
    return limitEventStartEnd(
      filterAnonymousEvent(
        filterEventByDate(originalEmployeesEvents, selectDateMs), true
      ), selectDateMs
    )
  }, [originalEmployeesEvents, selectDateMs])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: () => ({ anonymous: true }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      // canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <Drawer
      // hideBackdrop
      variant="persistent"
      anchor="bottom"
      open={open}
      sx={{
        '& .MuiCard-root': {
          flex: '0 0 18%',
          maxWidth: 300,
          mr: '1.5%',
          mt: 4,
          mb: 3,
          '&:first-of-type': {
            ml: '2%',
          },
        },
        '& .MuiDrawer-paper': {
          zIndex: 1251,
          minHeight: 180,
          flexDirection: 'row',
        },
      }}
      {...restProps}
    >
      <Box
        className="thick-scrollbar"
        ref={drop}
        sx={{
          display: 'flex',
          flexGrow: 1,
          overflowX: 'overlay',
          // bgcolor: theme => alpha(theme.palette.primary.light, 0.1),
          '&::before': {
            content: '""',
            position: 'absolute',
            transition: 'all 0.15s ease-in-out',
            top: '0%',
            left: 0,
            width: '100%',
            height: isOver ? '100%' : '70%',
            zIndex: -1,
            // transform: 'Rotate(-1deg)',
            bgcolor: theme => alpha(theme.palette.primary.light, isOver ? 0.2 : 0.1),
          },
        }}
      >
        {
          events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              handleDelete={handleDeleteEvent(event)}
              handleEditClick={handleEditClick}
              handleEventDrop={handleEventDrop}
              handleCheckInToggle={handleCheckInToggle}
              petReserveTypeMapping={petReserveTypeMapping}
            />
          ))
        }
      </Box>
    </Drawer>
  )
}


export default memo(BottomDrawer)