import React, { Suspense, lazy } from 'react'
import { Box } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MiniDrawer from './components/SideBar/MiniDrawer'
import useCustomizedTheme from './hooks/useCustomizedTheme'
import ItineraryReminder from './components/SideBar/ItineraryReminder'

const CageBoard = lazy(() => import('./pages/CageBoard'))
const DateGrid = lazy(() => import('./pages/DateGrid'))
const TestCalendar = lazy(() => import('./pages/TestCalendar'))
const ConsultationManage = lazy(() => import('./pages/ConsultationManage'))
const PurchaseRecordsAccordion = lazy(() => import('./pages/PurchaseRecordsAccordion'))
const SpringDemo = lazy(() => import('./pages/SpringDemo'))
const GoogleAuth1 = lazy(() => import('./pages/GoogleAuthorization1'))
const GoogleAuth2 = lazy(() => import('./pages/GoogleAuthorization2'))

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
                <Route exact path="/date-grid" element={<DateGrid />} />
                <Route exact path="/calendar" element={<TestCalendar />} />
                <Route exact path="/consultation" element={<ConsultationManage />} />
                <Route exact path="/purchase-record" element={<PurchaseRecordsAccordion />} />
                <Route exact path="/spring-demo" element={<SpringDemo />} />
                <Route exact path="/auth1" element={<GoogleAuth1 />} />
                <Route exact path="/auth2" element={<GoogleAuth2 />} />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </Router>
    </CustomizedThemeProvider>
  )
}


export default App
