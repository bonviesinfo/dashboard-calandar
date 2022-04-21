import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'

// const MyAnimatedComponent = animated(({ value }) => <div>{value}</div>)
// const MyAnimatedComponentWithRefForwarding = animated(
//   forwardRef(({ value }, ref) => <div ref={ref}>{value}</div>)
// )


const SpringDemo = () => {
  const theme = useTheme()

  const styles = useSpring({
    from: { x: 0, y: 0 },
    x: 200,
    y: 200,
    // opacity: 1,
    // cancel: key => key !== 'x',
    config: { duration: 500 },
    loop: {
      reverse: true,
    },
  })


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: alpha(theme.palette.primary.main, 0.3),
      }}
    >
      <animated.div
        style={{
          width: 80,
          height: 80,
          backgroundColor: '#46e891',
          borderRadius: 16,
          ...styles,
        }}
      />


    </Box>
  )
}

export default SpringDemo