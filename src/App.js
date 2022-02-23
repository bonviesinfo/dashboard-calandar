import React, { Suspense, lazy } from 'react'
import { Box } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MiniDrawer from './components/SideBar/MiniDrawer'
import useCustomizedTheme from './hooks/useCustomizedTheme'
import ItineraryReminder from './components/SideBar/ItineraryReminder'

const CageBoard = lazy(() => import('./pages/CageBoard'))
const ConsultationManage = lazy(() => import('./pages/ConsultationManage'))
const PurchaseRecordsAccordion = lazy(() => import('./pages/PurchaseRecordsAccordion'))

const App = () => {
  const { CustomizedThemeProvider } = useCustomizedTheme()

  return (
    <CustomizedThemeProvider>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <MiniDrawer />
          <ItineraryReminder />

          <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
            <Suspense fallback={null}>
              <Routes>
                <Route exact path="/" element={<CageBoard />} />
                <Route exact path="/consultation" element={<ConsultationManage />} />
                <Route exact path="/purchase-record" element={<PurchaseRecordsAccordion />} />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </Router>
    </CustomizedThemeProvider>
  )
}

export default App
