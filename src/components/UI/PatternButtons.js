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
        onClick={() => colorMode.togglePattern('red')}
        color="inherit"
        size="small"
      >
        <CircleIcon
          className="pattern-icon"
          fontSize="small"
          sx={{
            color: '#e57373',
            borderRadius: '50%',
            ...(theme.palette.pattern === 'red' && { border: `2px solid ${theme.palette.text.fader}` })
          }}
        />
      </IconButton>

      <IconButton
        onClick={() => colorMode.togglePattern('teal')}
        color="inherit"
        size="small"
      >
        <CircleIcon
          className="pattern-icon"
          fontSize="small"
          sx={{
            color: '#4db6ac',
            borderRadius: '50%',
            ...(theme.palette.pattern === 'teal' && { border: `2px solid ${theme.palette.text.fader}` })
          }}
        />
      </IconButton>

      {/* <IconButton
        onClick={() => colorMode.togglePattern('blue')}
        color="inherit"
        size="small"
      >
        <CircleIcon
          className="pattern-icon"
          fontSize="small"
          sx={{
            color: '#64b5f6',
            borderRadius: '50%',
            ...(theme.palette.pattern === 'blue' && { border: `2px solid ${theme.palette.text.fader}` })
          }}
        />
      </IconButton> */}

      <IconButton
        onClick={() => colorMode.togglePattern('indigo')}
        color="inherit"
        size="small"
      >
        <CircleIcon
          className="pattern-icon"
          fontSize="small"
          sx={{
            color: '#7986cb',
            borderRadius: '50%',
            ...(theme.palette.pattern === 'indigo' && { border: `2px solid ${theme.palette.text.fader}` })
          }}
        />
      </IconButton>
    </>
  )
}

// theme.palette.pattern === 'red'

export default PatternButtons