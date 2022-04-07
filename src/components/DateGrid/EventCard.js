import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useDrag } from 'react-dnd'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import DoDisturbOnRoundedIcon from '@mui/icons-material/DoDisturbOnRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

const getDuration = (start, end) => {
  const duration = end - start
  const hr = Math.floor(duration / 3600000)
  const min = Math.floor((duration % 3600000) / 60000)

  return `${hr ? `${hr}小時` : ''}${min ? `${min}分` : ''}`
}

const EventCard = ({
  row,
  event,
  handleDelete,
  handleEditClick,
  handleEventDrop,
  handleCheckInToggle,
  petReserveTypeMapping,
}) => {
  const smallMode = !row || row <= 4
  const ultraSmallMode = !row || row <= 3
  const isCross = event.pseudoStart || event.pseudoEnd

  const [{ isDragging, currentItem }, drag] = useDrag(() => ({
    type: 'CARD',
    item: event || {},
    canDrag: () => !isCross,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult && dropResult.gridIndex && dropResult.employeeId && item) {
        handleEventDrop(item, dropResult.gridIndex, dropResult.employeeId)
      } else if (dropResult && dropResult.anonymous) {
        handleEventDrop(item, dropResult.gridIndex, dropResult.employeeId, dropResult.anonymous)
      }
    },
    collect: (monitor) => ({
      currentItem: monitor.getItem(),
      isDragging: monitor.isDragging(),
      // handlerId: monitor.getHandlerId(),
    }),
  }), [event])


  const opacity = isDragging ? 0.4 : 1
  const isOtherDragging = (event && currentItem && currentItem.id !== event.id) || isDragging

  return (
    <Card className={`event-card${isOtherDragging ? ' dragging' : ''}${isCross ? ' cross' : ''}${event.isCheckIn ? ' check-in' : ''}`}
      ref={drag}
      sx={{
        height: row * 60 || 120,
        opacity,
      }}
    >
      <div className={'card-container'}>

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

        <Box className={`actions${event.employeeId ? '' : ' anonymous'}`} display="flex" justifyContent="space-between" alignItems="center">

          <Box display="flex" justifyContent="space-between" alignItems="center" position="relative">
            <IconButton size="small" className="edit-btn" onClick={() => handleEditClick(event)}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>

            <IconButton size="small" className="delete-btn" onClick={handleDelete}>
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" position="relative">
            {
              !event.employeeId && (
                <>
                  <Typography variant="subtitle2" component="span" fontWeight="bold">
                    {new Date(event.start).toLocaleString('zh-CN', { hour12: false }).slice(0, -3)}&emsp;
                  </Typography>
                  <Typography className="duration-text" variant="subtitle2" component="span" fontWeight="bold">
                    {getDuration(event.start, event.end)}
                  </Typography>
                </>
              )
            }
            {
              !event.isCheckIn
                ? (
                  event.employeeId ? (
                    <Button className="check-in-btn" size="small" variant="contained" disableElevation onClick={() => handleCheckInToggle(event.id)}>
                      完成
                    </Button>
                  ) : (
                    <IconButton size="small" className="check-in-icon-btn" color="primary" onClick={() => handleCheckInToggle(event.id)}>
                      <CheckCircleRoundedIcon />
                    </IconButton>
                  )
                )
                : (
                  <IconButton size="small" className="check-in-icon-btn cancel" color="default" onClick={() => handleCheckInToggle(event.id)}>
                    <DoDisturbOnRoundedIcon />
                  </IconButton>
                )
            }
          </Box>

        </Box>

      </div>
    </Card>
  )
}

export default EventCard