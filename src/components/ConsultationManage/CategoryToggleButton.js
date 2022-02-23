import React from 'react'
import { alpha } from '@mui/material/styles'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

function CategoryToggleButton({ selected, onSelected }) {

  return (
    <FormControl
      sx={{
        ml: 2,
        minWidth: 120,
      }}
    >
      <Select
        displayEmpty
        value={selected}
        onChange={onSelected}
        aria-label="category"
        sx={{
          '& .MuiSelect-select': {
            py: 0.6125,
            fontSize: '0.875rem',
            color: 'text.secondary',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme => alpha(theme.palette.common.black, 0.12),
          },
        }}
      >
        <MenuItem value="" aria-label="all">
          全部類別
        </MenuItem >
        <MenuItem value="t1" aria-label="commodity-consultation">
          商品諮詢
        </MenuItem>
        <MenuItem value="t2" aria-label="customer-complaint">
          客訴案件
        </MenuItem>
        <MenuItem value="t3" aria-label="campaign-promotion">
          活動推廣
        </MenuItem>
        <MenuItem value="t4" aria-label="commodity-purchase">
          商品下單
        </MenuItem>
        <MenuItem value="t5" aria-label="other">
          其他
        </MenuItem>
      </Select>

    </FormControl>
  )
}

export default CategoryToggleButton
