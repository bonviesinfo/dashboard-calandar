import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'


// reserveType: 'tt2',

const EventCard = ({
  row,
  event,
  handleDelete,
  petReserveTypeMapping,
}) => {
  const smallMode = !row || row <= 3

  return (
    <Card className="event-card"
      sx={{
        height: row * 60 || 120,
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

          {!smallMode && (
            <Avatar
              className={`avatar ${row <= 4 ? 'small' : ''}`}
              alt={event?.pet?.petName}
              variant="rounded"
              src={event?.pet?.avatar || ''}
            />
          )}

          <Box sx={{
            px: 1,
            overflow: 'auto',
            ...(smallMode && { mt: 1 })
          }}>
            <Typography variant="subtitle2">
              {event?.remark || '-'}
            </Typography>
          </Box>

        </div>

        <Box className={`actions ${row <= 4 ? 'small' : ''}`} display="flex" justifyContent="flex-end">
          <IconButton size="small" className="edit-btn">
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