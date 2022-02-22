import React, { useState, useMemo } from 'react'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import { useMediaQuery, CssBaseline } from '@mui/material'
import { amber, brown, teal, grey } from '@mui/material/colors'
import ColorModeContext from '../contexts/ColorModeContext'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      // ...amber,
      main: teal[400],
      ...(mode === 'dark' && {
        main: amber[500],
      }),
    },
    background: {
      foggy: '#f5f5f5',
    },
    ...(mode === 'dark' && {
      background: {
        default: brown[900],
        paper: brown[900],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
          primary: grey[900],
          secondary: grey[800],
        }
        : {
          primary: '#fff',
          secondary: grey[500],
        }),
    },
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
})


const useCustomizedTheme = () => {
  const [mode, setMode] = useState(
    useMediaQuery('(prefers-color-scheme: dark)')
      ? 'dark'
      : 'light'
  )

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }), []
  )

  const theme = useMemo(
    () => (
      createTheme(getDesignTokens(mode))
    ), [mode]
  )

  const CustomizedThemeProvider = props => (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )

  return { CustomizedThemeProvider }
}

export default useCustomizedTheme