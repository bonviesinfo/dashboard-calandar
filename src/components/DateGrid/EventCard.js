import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { useDrag } from 'react-dnd'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'


// reserveType: 'tt2',

const EventCard = ({
  row,
  event,
  handleDelete,
  handleEditClick,
  handleEventDrop,
  petReserveTypeMapping,
}) => {
  const smallMode = !row || row <= 4
  const ultraSmallMode = !row || row <= 3

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { event },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && item && item.event) {
        handleEventDrop(item.event, dropResult.gridIndex, dropResult.employeeId)
        // alert(`You dropped ID : ${item.event?.id} into X : ${dropResult.employeeId} Y : ${dropResult.gridIndex}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? 0.4 : 1

  return (
    <Card className={`event-card${isDragging ? ' dragging' : ''}`}
      ref={drag}
      sx={{
        height: row * 60 || 120,
        opacity,
      }}
    >
      <div className="card-container">

        <div className="content">

          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography
              noWrap
              variant="h5"
              fontWeight="bold"
              title={event?.pet?.petName}
              sx={{
                letterSpacing: '0.025em',
              }}
            >
              {event?.pet?.petName || '目前沒名字'}
            </Typography>

            <Chip label={event && event.reserveType && petReserveTypeMapping ? petReserveTypeMapping[event.reserveType].name : '-'} className="chip" />
          </Box>

          {!ultraSmallMode && (
            <Avatar
              className={`avatar ${smallMode ? 'small' : ''}`}
              alt={event?.pet?.petName}
              variant="rounded"
              src={event?.pet?.avatar || ''}
            />
          )}

          <Box sx={{
            px: 1,
            overflow: 'auto',
            ...(ultraSmallMode && { mt: 1 })
          }}>
            <Typography variant="subtitle2" className="remark">
              {event?.remark || '-'}
            </Typography>
          </Box>

        </div>

        <Box className={`actions ${smallMode ? 'small' : 'small'}`} display="flex" justifyContent="flex-end">
          <IconButton size="small" className="edit-btn" onClick={() => handleEditClick(event)}>
            <EditRoundedIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" className="delete-btn" onClick={handleDelete}>
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

      </div>
    </Card>
  )
}

export default EventCard