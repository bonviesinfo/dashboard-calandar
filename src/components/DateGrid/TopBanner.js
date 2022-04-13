import React from 'react'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'


const TopBanner = () => {
  const theme = useTheme()



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
          bgcolor: alpha(theme.palette.primary.main, 0.4),
        }}
      >


        <Box
          className="hookah-boundary"
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            overflow: 'hidden',

            position: 'absolute',
            width: '30%',
            height: '30%',
            top: '15%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
            border: `2px dashed ${theme.palette.secondary.light}`,
          }}
        >
          <Box className="hookah-wrapper"
            sx={{
              width: '70%',
              height: '70%',
              bgcolor: theme.palette.secondary.light,
              borderRadius: theme.shape.borderRadius,
            }}
          >

          </Box>
        </Box>

        <Box className="dachshund-boundary"
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            overflow: 'hidden',

            position: 'absolute',
            width: '50%',
            height: '50%',
            top: '60%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            border: `2px dashed ${theme.palette.secondary.light}`,
          }}
        >
          <Box className="dachshund-wrapper"
            sx={{
              width: '70%',
              height: '70%',
              bgcolor: theme.palette.secondary.light,
              borderRadius: theme.shape.borderRadius,
            }}
          >
          </Box>

        </Box>


      </Box>
    </Box>
  )
}

export default TopBanner