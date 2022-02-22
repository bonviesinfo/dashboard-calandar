import React, { useState, useMemo } from 'react'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import { useMediaQuery, CssBaseline } from '@mui/material'
import { amber, brown, teal, grey } from '@mui/material/colors'
import ColorModeContext from '../../contexts/ColorModeContext'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      // ...amber,
      main: amber[500],
      ...(mode === 'dark' && {
        main: teal[500],
      }),
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

const withCustomizedTheme = ChildComponent => {
  const ComposedComponent = props => {
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
        responsiveFontSizes(
          createTheme(getDesignTokens(mode))
        )
      ), [mode]
    )

    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ChildComponent {...props} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return ComposedComponent
}

export default withCustomizedTheme