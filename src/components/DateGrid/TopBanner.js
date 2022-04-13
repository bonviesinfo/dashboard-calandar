import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import background1 from '../../images/hookah.png'
import dogBg from '../../images/dog-bg.png'


const TopBanner = () => {
  const theme = useTheme()
  // const [flipA, setFlipA] = useState(false)
  const styles = useSpring({
    from: { y: 0, x: 0 },
    to: { y: 50, x: 270 },
    loop: { reverse: true },
    // reset: true,
    // reverse: flipA,
    // onRest: () => setFlipA(!flipA),
    delay: 1000,
    config: {
      duration: 1500
    },
  })

  const rotateStyles = useSpring({
    loop: { reverse: true },
    from: { rotateZ: -15 },
    to: { rotateZ: 15 },
    delay: 50,
    config: {
      duration: 800
    },
  })

  // const yStyles = useSpring({
  //   loop: { reverse: true },
  //   from: { y: 90 },
  //   to: { y: -120 },
  //   delay: 150,
  //   config: {
  //     duration: 2400
  //   },
  // })


  return (
    <Box className="top-banner"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Box className="top-banner-content"
        sx={{
          position: 'relative',
          width: '90%',
          height: '90%',
          bgcolor: alpha(theme.palette.primary.main, 0.8),
        }}
      >


        <Box
          className="hookah-boundary"
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            overflow: 'hidden',

            position: 'absolute',
            width: '40%',
            height: '40%',
            top: '0%',
            left: '0%',
            transform: 'translate(0%, 0%)',
            // border: `2px dashed ${theme.palette.secondary.light}`,
          }}
        >
          <Box className="hookah-wrapper"
            sx={{
              width: '40%',
              height: '70%',
              bgcolor: theme.palette.text.mid,
              borderBottomRightRadius: '50%',
            }}
          >
            <animated.div
              style={{
                position: 'absolute',
                top: '0%',
                left: '0%',
                width: '100%',
                height: '60%',
                transform: 'translate(-50%, 0%)',
                borderRadius: 16,
                background: `url(${dogBg}) no-repeat center`,
                backgroundSize: 'contain',
                ...styles,
              }}
            >
            </animated.div>

          </Box>
        </Box>

        <Box className="dachshund-boundary"
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',

            position: 'absolute',
            width: '66%',
            height: '66%',
            top: '65%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
            // border: `2px dashed ${theme.palette.secondary.light}`,
          }}
        >
          <Box className="dachshund-wrapper"
            sx={{
              width: '70%',
              height: '100%',
              bgcolor: theme.palette.secondary.light,
              borderRadius: '50%',
              transform: 'rotateY(12deg) rotateY(6deg)',
            }}
          >
            <animated.div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                // ...yStyles,
              }}
            >

              <animated.div
                style={{
                  position: 'absolute',
                  top: '60%',
                  left: '8%',
                  width: '55%',
                  paddingTop: '55%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: 16,
                  background: `url(${background1}) no-repeat center`,
                  backgroundSize: 'cover',
                  ...rotateStyles,
                }}
              />

              <animated.div
                style={{
                  position: 'absolute',
                  top: '0%',
                  left: '50%',
                  width: '70%',
                  paddingTop: '70%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: 16,
                  background: `url(${background1}) no-repeat center`,
                  backgroundSize: 'cover',
                  ...rotateStyles,
                }}
              >

              </animated.div>

              <animated.div
                style={{
                  position: 'absolute',
                  top: '60%',
                  right: '8%',
                  width: '55%',
                  paddingTop: '55%',
                  transform: 'translate(50%, -50%)',
                  borderRadius: 16,
                  background: `url(${background1}) no-repeat center`,
                  backgroundSize: 'cover',
                  ...rotateStyles,
                }}
              />

            </animated.div>


          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default TopBanner