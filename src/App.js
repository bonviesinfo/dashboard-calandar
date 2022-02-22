import React from 'react'
import useCustomizedTheme from './hooks/useCustomizedTheme'

import CageBoard from './pages/CageBoard'

const App = () => {
  const { CustomizedThemeProvider } = useCustomizedTheme()

  return (
    <CustomizedThemeProvider>
      <CageBoard />
    </CustomizedThemeProvider>
  )
}

export default App
