import React from 'react'
import Box from '@mui/material/Box'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import TextField from '@mui/material/TextField'

export default function MyCalendarPicker(props) {
  const { sx } = props
  const [value, setValue] = React.useState(new Date())

  return (
    <Box
      sx={{
        ...sx,
        '& .MuiPickerStaticWrapper-root': {
          boxShadow: '0px 0px 7px -4px #a0a0a0',
          borderRadius: '1em',
        },
        '& .MuiCalendarPicker-root': {
          height: 300,
          maxHeight: 300,
        },
        '& .PrivatePickersSlideTransition-root': { minHeight: 200 },
      }}
    >
      <StaticDatePicker
        value={value}
        onChange={(newValue) => { setValue(newValue) }}
        minDate={new Date('2015-01-01')}
        displayStaticWrapperAs="desktop"
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  )
}
