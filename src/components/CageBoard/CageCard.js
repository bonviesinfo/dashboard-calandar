import React from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PetsRoundedIcon from '@mui/icons-material/PetsRounded'

export function CageCard({ info, serial, fill, handleClick }) {

  return (
    <Grid item md={1}
      className="cage-grid"
      sx={{
        '&::before': {
          content: `${serial ? `'${serial}'` : '"null"'}`,
        },
      }}
    >
      <Card>
        <IconButton className="control-btn" onClick={handleClick}>
          <MoreVertIcon fontSize="large" />
        </IconButton>

        <CardActionArea onClick={handleClick}>
          <Box sx={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap' }}>
            <Box sx={{ px: 0, py: 0, minWidth: 150, flex: fill ? '0 0 100%' : '0 0 56%' }}>
              <Avatar
                alt="Remy Sharp"
                variant="rounded"
                src={(info.pet && info.pet.avatar) || ''}
                sx={{
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  width: '100%',
                  height: fill ? 100 : '100%',
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: fill ? 'auto' : 0, }}>
              <Box className="card-content"
                sx={{
                  '& > div': {
                    flex: fill ? '0 1 50%' : '0 0 100%',
                    maxWidth: fill ? '50%' : '100%',
                  },
                }}
              >
                <Box>
                  {/* <AccountCircleIcon fontSize="large" titleAccess="名字" /> */}
                  <Typography variant="body1" color="text.secondary" noWrap fontWeight="bold">
                    名稱
                  </Typography>
                  <span>:</span>
                  <Typography variant="body1" color="text.secondary" noWrap fontWeight="bold">
                    {(info.pet && info.pet.petName) || '未知'}
                  </Typography>
                </Box>

                <Box>
                  {/* <FavoriteBorderIcon fontSize="large" titleAccess="年齡" /> */}
                  <Typography variant="body1" color="text.secondary" noWrap fontWeight="bold">
                    年齡
                  </Typography>
                  <span>:</span>
                  <Typography variant="body1" color="text.secondary" noWrap>
                    {(info.pet && info.pet.petAge) || '未知'}
                  </Typography>
                </Box>

                <Box>
                  {/* <MonitorHeartIcon fontSize="large" /> */}
                  <Typography variant="body1" color="text.secondary" noWrap fontWeight="bold">
                    品種
                  </Typography>
                  <span>:</span>
                  <Typography variant="body1" color="text.secondary" noWrap>
                    {(info.pet && info.pet.petCategory) || ' - '}
                  </Typography>
                </Box>

                <Box>
                  {/* <MedicalServicesIcon fontSize="large" /> */}
                  <Typography variant="body1" color="text.secondary" noWrap fontWeight="bold">
                    內容
                  </Typography>
                  <span>:</span>
                  <Typography variant="body1" color="text.secondary" noWrap title="Acebrocholooo">
                    {info.content || ' - '}
                  </Typography>
                </Box>

              </Box>
            </Box>
          </Box>
        </CardActionArea>

        <Box className="card-action">
          <div>
            <IconButton size="medium">
              <MedicalServicesIcon fontSize="medium" className="orange" />
            </IconButton>
            <span>:</span>
            <Typography variant="body2" color="text.secondary" component="span">
              Acebrochol
            </Typography>
          </div>

          <div>
            <IconButton size="medium">
              <MonitorHeartIcon fontSize="medium" className="yellow" />
            </IconButton>
            <span>:</span>
            <Typography variant="body2" color="text.secondary" component="span">
              Normal
            </Typography>
          </div>

          <div>
            <IconButton size="medium">
              <FavoriteBorderIcon fontSize="medium" className="blue" />
            </IconButton>
            <span>:</span>
            <Typography variant="body2" color="text.secondary" component="span">
              86
            </Typography>
          </div>

        </Box>

      </Card>
    </Grid>
  )
}

export function CageNullCard({
  serial,
  handleNullClick,
}) {
  return (
    <Grid item md={1}
      className="cage-grid"
      sx={{
        width: '100%',
        '&::before': {
          content: `${serial ? `'${serial}'` : '"null"'}`,
        },
      }}
    >
      <Card className="null-cage">
        {/* <Typography variant="body2" color="text.mid" noWrap sx={{ pt: 6, pb: 2 }}>
          No Pet
        </Typography> */}
        {/* <Box sx={{ pt: 6 }}>
          No Pet
        </Box> */}
        {/* <Button variant="outlined" size="small" sx={{ mt: 1, borderColor: theme => theme.palette.text.fade, color: 'text.fade' }}>
          入籠
        </Button> */}

        <IconButton size="large" sx={{ mt: 8 }}>
          <PetsRoundedIcon fontSize="large" sx={{
            width: '3.5rem',
            height: '3.5rem',
            color: 'text.fade',
          }} />
        </IconButton>

        <Button
          variant="contained"
          size="small"
          disableElevation
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            mt: 6,
            mb: 2,
            color: 'background.default',
            bgcolor: 'text.fade',
            '&:hover': {
              bgcolor: theme => alpha(theme.palette.primary.light, 0.8),
              color: 'background.default',
            },
          }}
          onClick={handleNullClick}
        >
          其他
        </Button>

      </Card>
    </Grid>
  )
}