import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'

function DeletePopover({ anchorEl, onClose, onDeleteConfirm, ...restProps }) {
  const handleDeleteConfirm = () => {
    const deleteId = anchorEl.dataset.id
    if (!deleteId) return
    onDeleteConfirm(deleteId)
    onClose()
  }

  return (
    <Popover
      {...restProps}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          p: 1,
          width: '15rem',
          bgcolor: 'text.disabled',
          textAlign: 'center',
          '& .MuiTextField-root': {
            my: 1,
            width: '100%',
          },
          '& .MuiButton-root': {
            mx: 1,
          },
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: 'text.light', fontWeight: 'bold', pb: 1 }}
      >
        確定刪除 ?
      </Typography>
      <div>
        <Button variant="contained" color="warning" onClick={handleDeleteConfirm}>
          刪除
        </Button>
        <Button variant="contained" color="inherit" onClick={onClose}>
          取消
        </Button>
      </div>
    </Popover>
  )
}

export default DeletePopover
