import React, { useState } from 'react'
import { omit } from 'lodash-es'
import { alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { dummyMembers } from '../../data/dummyConsultationData'

function EnterPopover({ member, onClose, ...restProps }) {

  const [errors, setErrors] = useState({})
  const [currentMember, setCurrentMember] = useState(null)
  const [currentPet, setCurrentPet] = useState(null)
  // const [memberInput, setMemberInput] = useState('')
  // const [memberPhoneInput, setMemberPhoneInput] = useState('')
  // const [petInput, setPetInput] = useState('')
  const [creatingConsultation, setCreatingConsultation] = useState({})

  const onMemberChange = (e, optionValue) => {
    setErrors(omit(errors, ['member', 'phone']))
    setCurrentMember(optionValue)
    setCurrentPet(null)
    // setPetInput('')
  }

  const onPetChange = (e, optionValue) => {
    setErrors(omit(errors, ['pet']))
    setCurrentPet(optionValue)
  }

  const onTextChange = e => {
    setErrors(omit(errors, 'text'))
    setCreatingConsultation((prev) => ({
      ...prev,
      text: e.target.value,
    }))
  }

  const resetForm = () => {
    setCurrentMember(null)
    // setMemberInput('')
    // setMemberPhoneInput('')
    setCurrentPet(null)
    // setPetInput('')
  }

  const validateConsultation = () => {
    const newErrors = {}
    if (!currentMember) newErrors.member = '會員為必填'
    if (!currentPet) newErrors.pet = '寵物為必填'
    if (!creatingConsultation.text) newErrors.text = '文字內容為必填'
    setErrors(newErrors)
    return Object.keys(newErrors).length > 0
  }

  const onConfirmClick = () => {
    if (validateConsultation()) return
    // const newConsultation = {
    //   ...creatingConsultation,
    //   id: nanoid(),
    //   isExpanded: true,
    //   recordedAt: Date.now(),
    //   member: currentMember,
    //   remindStart: new Date(creatingConsultation.remindStart).getTime(),
    //   ...(creatingConsultation.remindEnd && { remindEnd: new Date(creatingConsultation.remindEnd).getTime() }),
    //   ...(currentPet && { pet: currentPet }),
    // }

    resetForm()
    onClose()
  }


  return (
    <Popover
      {...restProps}
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
          p: 2,
          width: '90%',
          maxWidth: 350,
          bgcolor: 'background.light',
          '& .option-wrapper': {
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'space-between',
            '& .minor': {
              fontSize: '0.875em',
              letterSpacing: '0.04em',
              color: 'text.secondary',
            },
          },
          '& .MuiTextField-root': {
            my: 1,
            width: '100%',
            '&.last-one': {
              mb: 2,
            },
          },
          '& .MuiFormHelperText-root': {
            mx: 1.75,
          },
        },
      }}
    >

      <Typography variant="h6" sx={{
        color: 'primary.light',
        fontWeight: 'bold',
        textAlign: 'left',
        mb: 0.25,
      }}
      >
        寵物入籠
      </Typography>

      <Autocomplete
        disablePortal
        sx={{ width: '100%' }}
        options={dummyMembers}
        value={currentMember}
        onChange={onMemberChange}
        getOptionLabel={option => option.name}
        renderInput={params => (
          <TextField
            required
            label="會員名稱"
            error={Boolean(errors.member)}
            helperText={errors.member}
            {...params} />
        )}
        renderOption={(props, option) => (
          <div {...props} >
            <div className="option-wrapper">
              <span>{option.name}</span>
              <span className="minor">{option.mobile}</span>
            </div>
          </div>
        )}
      />

      {
        (currentMember && currentMember.pets) && (
          <Autocomplete
            disablePortal
            sx={{ width: '100%' }}
            options={currentMember.pets}
            value={currentPet}
            onChange={onPetChange}
            getOptionLabel={option => option.name}
            renderInput={(params) => (
              <TextField
                label="寵物名稱"
                error={Boolean(errors.pet)}
                helperText={errors.pet}
                {...params}
              />
            )}
            renderOption={(props, option) => (
              <div {...props} >
                <div className="option-wrapper">
                  <span>{option.name}</span>
                  <span className="minor">{option.breed}</span>
                </div>
              </div>
            )}
          />
        )
      }

      <TextField
        multiline
        value={creatingConsultation.text || ''}
        placeholder="請輸入文字內容 *"
        onChange={onTextChange}
        maxRows={10}
        minRows={7}
        error={Boolean(errors.text)}
        helperText={errors.text}
      />

      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={onConfirmClick}
          sx={{
            mt: 2,
            mb: 1,
            bgcolor: theme => alpha(theme.palette.secondary.light, 0.8),
            '&:hover': {
              bgcolor: theme => alpha(theme.palette.secondary.light, 0.9),
            },
          }}
        >
          確認
        </Button>
      </Box>

    </Popover >
  )
}

export default EnterPopover