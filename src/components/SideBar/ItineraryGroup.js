import React from 'react'
import { Box, Typography, Card, CardContent, CardActions } from '@mui/material'

export default function ItineraryGroup(props) {
  const { data, title } = props

  const renderCards = data => {
    const dataToRender = data || Array.from(new Array(3))
    return dataToRender.map((item, index) => {
      return (
        <Card key={index} tabIndex="0">
          <CardContent>
            <Typography className="card-title" gutterBottom variant="subtitle1" component="div">
              你的待辦標題
            </Typography>

            <Typography className="card-subtitle" gutterBottom variant="body2" component="div" color="text.secondary" noWrap>
              一些詳細內容Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, mollitia.
            </Typography>
          </CardContent>

          <CardActions className="card-info">
            <div className="info-sec">
              <Typography variant="body2" color="text.secondary">
                會員：
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                游小姐
              </Typography>
            </div>
            <div className="info-sec">
              <Typography variant="body2" color="text.secondary">
                負責人：
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                陳先生
              </Typography>
            </div>
          </CardActions>
        </Card>
      )
    })
  }

  return (
    <Box>
      {title && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            pt: 0.5,
            pb: 1,
          }}
        >
          {title}
        </Typography>
      )}
      <Box sx={{
        '& .MuiCard-root': {
          maxWidth: 345,
          mb: 2,
          mx: 'auto',
          outlineColor: (theme) => theme.palette.primary.main,
        },
        '& .MuiCardContent-root': {
          pb: 0.5,
        },
        '& .card-title': {
          color: 'primary.editingText',
          fontWeight: 'bold',
          letterSpacing: '0.025em',
          mb: '0.25rem',
        },
        '& .card-info': {
          justifyContent: 'space-between',
          bgcolor: 'grey.50',
        },
        '& .info-sec': {
          display: 'flex',
        },
      }}>
        {renderCards(data)}
      </Box>
    </Box>
  )
}
