import React, { useState } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'

const words = ['We', 'came.', 'We', 'saw.', 'We', 'kicked', 'its', 'ass.']

const SpringDemo = () => {
  const theme = useTheme()

  const [flip, set] = useState(false)
  const { number } = useSpring({
    reset: true,
    reverse: flip,
    from: { number: 0 },
    number: 1,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  })

  const { scroll } = useSpring({
    scroll: (words.length - 1) * 50,
    from: { scroll: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
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

      <animated.div style={{ fontSize: "2rem", fontWeight: 'bold' }}>{number.to(n => n.toFixed(2))}</animated.div>

      <animated.div
        style={{
          position: 'relative',
          width: '100%',
          height: 60,
          overflow: 'auto',
          fontSize: '0.5em',
        }}
        scrollTop={scroll}>
        {words.map((word, i) => (
          <div
            key={`${word}_${i}`}
            style={{ width: '100%', height: 50, textAlign: 'center' }}>
            {word}
          </div>
        ))}
      </animated.div>


    </Box>
  )
}

export default SpringDemo