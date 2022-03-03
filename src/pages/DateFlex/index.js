import React, { Fragment } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const dummyEmployeeData = [
  {
    name: '정진우',
  },
  {
    name: '曉華',
  },
  {
    name: '小美',
  },
  {
    name: '阿明',
  },
  {
    name: '瑞華',
  },
]

const DateFlex = () => {



  return (
    <Box
      sx={{
        py: { xs: 2, sm: 3 },
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Box sx={{
        width: '90%',
        m: '0 auto',
        overflowX: 'auto',
      }}>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > div': {
              flex: '0 0 20%',
            },
          }}
        >
          {dummyEmployeeData.map((employee, index) => {

            const restItem = Array.from(new Array(9)).map((item, index) => (
              <div key={'d' + index}>
                {index + 1}
              </div>
            ))

            return (
              <Fragment>
                <div key={index}>
                  {employee.name}
                </div>
                {restItem}
              </Fragment>
            )
          })}
        </Box>


      </Box>



      <Stepper activeStep={-1} orientation="vertical">
        <Step>
          <StepLabel >
            01:00
          </StepLabel>
        </Step>

        <Step>
          <StepLabel >
            02:00
          </StepLabel>
        </Step>

        <Step>
          <StepLabel >
            03:00
          </StepLabel>
        </Step>
      </Stepper>
    </Box>
  )
}

export default DateFlex