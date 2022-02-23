import { Fragment } from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'

const MemberTooltip = styled(({ className, member, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }}
    title={
      <Fragment>
        <div>
          <Typography className="bold" variant="subtitle2" component="span">
            姓名 :&nbsp;&nbsp;
          </Typography>
          <Typography className="large-letter-spacing" variant="body2" component="span">
            {member.name}
          </Typography>
        </div>

        <div>
          <Typography className="bold" variant="subtitle2" component="span">
            電話 :&nbsp;&nbsp;
          </Typography>
          <Typography className="large-letter-spacing" variant="body2" component="span">
            {member.mobile}
          </Typography>
        </div>

        {member.address && (
          <div>
            <Typography className="bold" variant="subtitle2" component="span">
              地址 :&nbsp;&nbsp;
            </Typography>
            <Typography className="large-letter-spacing" variant="body2" component="span">
              {member.address}
            </Typography>
          </div>
        )}
      </Fragment>
    } />
))(({ theme }) => ({
  '& .MuiTooltip-arrow': {
    color: theme.palette.text.light,
  },
  '& .MuiTooltip-tooltip': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.text.light,
    boxShadow: theme.shadows[2],
  },
  '& .MuiTypography-root': {
    letterSpacing: '0.04em',
    '&.bold': {
      fontWeight: 'bold',
    },
  },
}))

export default MemberTooltip
