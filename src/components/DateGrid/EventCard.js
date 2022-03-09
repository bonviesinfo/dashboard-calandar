import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

const EventCard = ({
  row,
  pet,
  handleDelete,
}) => {

  return (
    <Card className="event-card"
      sx={{
        height: row * 60 || 180,
      }}
    >
      <div className="card-container">

        <div className="content">

          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography
              noWrap
              variant="h5"
              fontWeight="bold"
              title={pet?.petName}
              sx={{
                letterSpacing: '0.025em',
              }}
            >
              {pet?.petName || '-'}
            </Typography>

            <Chip label="美容"
              sx={{
                ml: 1.5,
                letterSpacing: '0.1em',
                color: 'background.default',
                bgcolor: 'success.light',
              }}
            />
          </Box>


          <Avatar
            alt={pet?.petName}
            variant="rounded"
            src={pet?.avatar || ''}
            sx={{
              width: '100%',
              height: 108,
              mt: 2,
              mb: 2,
            }}
          />


        </div>

        <Box className="actions" display="flex" justifyContent="flex-end">
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