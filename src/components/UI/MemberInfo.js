import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function MemberInfo({ member, sx }) {

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2,
        p: { xs: 4, sm: 1 },
        bgcolor: 'info.bg',
        border: (theme) => `3px solid ${theme.palette.grey[100]}`,
        color: (theme) => theme.palette.getContrastText(theme.palette.info.bg),
        '& .MuiGrid-item': {
          pr: 2,
        },
        '& .MuiTypography-subtitle1': {
          fontWeight: 'bold',
        },
        ...sx,
      }}
    >
      <Grid container>
        <Grid item container xs={12} sm="auto" direction="column">
          <Grid item>
            <Typography variant="subtitle1" component="span">
              會員代碼 :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              {member.id}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="span">
              會員姓名 :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              {member.name}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs={12} sm="auto" direction="column">
          <Grid item>
            <Typography variant="subtitle1" component="span">
              會員卡號 :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              系統預帶序號
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="span">
              行動電話 :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              {member.mobile}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs={12} sm="auto" direction="column">
          <Grid item>
            <Typography variant="subtitle1" component="span">
              出生日期 :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              1995/12/10
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="span">
              Email :&nbsp;
            </Typography>
            <Typography variant="body1" component="span">
              naosnaos@gmail.com
            </Typography>
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  )
}


