import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DatePicker from '@mui/lab/DatePicker'
import { dummyCageData } from '../../constants/dummyCageData'

const CustomizedDatePicker = ({
  setCages,
  filterCageDate,
}) => {
  const [dateValue, setDateValue] = useState(new Date())
  const [dateError, setDateError] = useState('')

  const onDateChange = (newValue) => {
    setDateError('')
    setDateValue(newValue)

    if (validateDate(newValue)) return
    setCages(
      filterCageDate(newValue)
    )
  }

  const validateDate = (dateValue) => {
    if (!dateValue) {
      setDateError('提醒開始時間為必填')
      return true
    } else if (!(dateValue instanceof Date) || isNaN(dateValue)) {
      setDateError('時間格式錯誤')
      return true
    }
    return false
  }

  // const onSubmit = e => {
  //   if (validateDate()) return
  //   setCages(
  //     filterCageDate(dateValue)
  //   )
  // }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <DatePicker
        inputFormat="yyyy/MM/dd"
        mask="____/__/__"
        value={dateValue}
        onChange={onDateChange}
        renderInput={(params) => (
          <TextField {...params}
            error={Boolean(dateError)}
            helperText={dateError}
          />
        )}
      />
      {/* <Button
        type="submit"
        className="search-btn"
        disableElevation
        variant="contained"
        color="primary"
        onClick={onSubmit}
      // startIcon={<AddCircleIcon />}
      >
        搜尋
      </Button> */}
    </form>
  )
}

export default CustomizedDatePicker