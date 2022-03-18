import React from 'react'
import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CircleIcon from '@mui/icons-material/Circle'
import ColorModeContext from '../../contexts/ColorModeContext'

const PatternButtons = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <>
      <IconButton
        onClick={() => colorMode.togglePattern('teal')}
        color="inherit"
      >
        <CircleIcon sx={{
          color: '#4db6ac',
          borderRadius: '50%',
          ...(theme.palette.pattern === 'teal' && { border: `2px solid ${theme.palette.text.mid}` })
        }} />
      </IconButton>

      <IconButton
        onClick={() => colorMode.togglePattern('red')}
        color="inherit"
      >
        <CircleIcon sx={{
          color: '#e57373',
          borderRadius: '50%',
          ...(theme.palette.pattern === 'red' && { border: `2px solid ${theme.palette.text.mid}` })
        }} />
      </IconButton>
    </>
  )
}

// theme.palette.pattern === 'red'

export default PatternButtons