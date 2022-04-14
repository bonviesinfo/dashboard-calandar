import React from 'react'
// import { styled } from '@mui/material/styles'
import { useSpring, animated } from 'react-spring'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import background1 from '../../images/hookah.png'
import dogBg from '../../images/dog-bg.png'

// const AnimatedBox = styled(props => <animated.div {...props} />)(() => { })


const TopBanner = () => {
  const theme = useTheme()
  // const [flipA, setFlipA] = useState(false)
  const styles = useSpring({
    from: { x: '-50%' },
    to: { x: '25%' },
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

  const [yStyles] = useSpring(() => ({
    loop: { reverse: true },
    from: { y: '20%' },
    to: { y: '-20%' },
    delay: 150,
    config: {
      duration: 2400
    },
  }))


  return (
    <Box className="top-banner"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
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
              position: 'relative',
              width: '30%',
              height: '60%',
              bgcolor: theme.palette.background.paper,
              borderBottomRightRadius: '50%',
            }}
          >
            <animated.div
              style={{
                position: 'absolute',
                top: '0%',
                left: '0%',
                width: '150%',
                height: '90%',
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
            height: '62%',
            top: '60%',
            left: '52%',
            transform: 'translate(-50%, -50%)',
            // border: `2px dashed ${theme.palette.secondary.light}`,
          }}
        >
          <Box className="dachshund-wrapper"
            sx={{
              position: 'relative',
              width: '70%',
              height: '100%',
              borderRadius: '50%',
              bgcolor: theme.palette.secondary.light,
              transform: 'rotateY(12deg) rotateY(6deg)',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                height: '85%',
                flex: '0 0 85%',
                borderRadius: '50%',
                bgcolor: theme.palette.background.paper,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.8),
                }}
              ></Box>
            </Box>

            <animated.div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                ...yStyles,
              }}
            >

              <animated.div
                style={{
                  position: 'absolute',
                  top: '66%',
                  left: '2%',
                  width: '50%',
                  paddingTop: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: 16,
                  background: `url(${background1}) no-repeat center`,
                  backgroundSize: 'cover',
                  ...rotateStyles,
                }}
              />

              <animated.div
                style={{
                  zIndex: 10,
                  position: 'absolute',
                  top: '4%',
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
                  top: '66%',
                  right: '2%',
                  width: '60%',
                  paddingTop: '60%',
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
    </Box >
  )
}

export default TopBanner