import React, { useState, useMemo } from 'react'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import { useMediaQuery, CssBaseline } from '@mui/material'
import { amber, cyan, teal, grey } from '@mui/material/colors'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import ColorModeContext from '../contexts/ColorModeContext'
import twLocale from 'date-fns/locale/zh-TW'


const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      editingBg: '#f8f9a4',
      main: teal[300],
      text: '#5590ac',
      ...(mode === 'dark' && {
        main: teal[700],
      }),
    },
    secondary: {
      // bg: '#feffe9',
      bg: '#fffee6',
      main: amber['A200'],
      text: '#ffdc6b',
      darkText: amber[500],
    },
    info: {
      shallow: cyan[50],
      bg: '#edf8f9',
      main: cyan[500],
    },
    background: {
      light: '#fcfcfc',
      paper: grey[50],
      foggy: grey[100],
    },
    ...(mode === 'dark' && {
      background: {
        default: grey[900],
        paper: grey[900],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
          primary: grey[900],
          secondary: 'rgba(0, 0, 0, 0.6)',
          third: grey[700],
          mid: grey[500],
          fader: grey[400],
          fade: grey[300],
          fadest: grey[200],
          lighter: grey[100],
          light: grey[50],
          lightest: '#fcfcfc',
        }
        : {
          primary: '#ffffff',
          secondary: grey[100],
          third: grey[200],
          lighter: grey[800],
          light: grey[900],
        }),
    },
    jewelry: {
      red: '#ff756a',
      darkRed: '#eb7167',
      blue: '#57c3ff',
      darkBlue: '#289ad9',
      lightBlue: '#a5dfff',
      // #ff8d6b
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
      responsiveFontSizes(
        createTheme(getDesignTokens(mode))
      )
    ), [mode]
  )

  const CustomizedThemeProvider = props => (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={twLocale}>
          <CssBaseline />
          {props.children}
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )

  return { CustomizedThemeProvider }
}

export default useCustomizedTheme