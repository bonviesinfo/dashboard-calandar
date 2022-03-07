import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { createConsultation } from '../../slices/consultationsSlice'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Popover from '@mui/material/Popover'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import FormHelperText from '@mui/material/FormHelperText'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { dummyMembers, principals, consultationCategories, minorPropertyTags, IMPORTANT_LEVELS } from '../../data/dummyConsultationData'
import { useConsultationForm } from '../../hooks/useConsultationForm'

const INITIAL_STATE = {
  remindStart: null,
  remindEnd: null,
  propertyTags: [{ id: 'pt3', name: '一般' }],
}

function CreatePopover({ member, onClose, ...restProps }) {
  const dispatch = useDispatch()
  const theme = useTheme()

  const {
    errors,
    currentMember,
    currentPet,
    creatingConsultation,
    setErrors,
    onImportantLevelRadio,
    onTagToggle,
    onMemberChange,
    onPetChange,
    onPrincipalChange,
    onCategoryChange,
    onRemindChange,
    onTextChange,
    resetForm,
  } = useConsultationForm(INITIAL_STATE)

  const validateConsultation = () => {
    const newErrors = {}
    if (!member && !currentMember) newErrors.member = '會員為必填'
    if (!creatingConsultation.principal) newErrors.principal = '負責人為必填'
    if (!creatingConsultation.category) newErrors.category = '類別為必填'
    if (!creatingConsultation.text) newErrors.text = '文字內容為必填'

    if (!creatingConsultation.remindStart) {
      newErrors.remindStart = '提醒開始時間為必填'
    } else if (!(creatingConsultation.remindStart instanceof Date) || isNaN(creatingConsultation.remindStart)) {
      newErrors.remindStart = '時間格式錯誤'
    }
    if (creatingConsultation.remindEnd && (
      !(creatingConsultation.remindEnd instanceof Date) || isNaN(creatingConsultation.remindEnd)
    )) {
      newErrors.remindEnd = '時間格式錯誤，若無需要請清空'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length > 0
  }

  const onConfirmClick = () => {
    if (validateConsultation()) return
    const newConsultation = {
      ...creatingConsultation,
      id: nanoid(),
      isExpanded: true,
      recordedAt: Date.now(),
      member: currentMember || member,
      remindStart: new Date(creatingConsultation.remindStart).getTime(),
      ...(creatingConsultation.remindEnd && { remindEnd: new Date(creatingConsultation.remindEnd).getTime() }),
      ...(currentPet && { pet: currentPet }),
    }

    dispatch(createConsultation(newConsultation))
    resetForm()
    onClose()
  }

  const renderPrincipalOptions = principals => {
    return principals.map(principal => (
      <MenuItem value={principal.id} key={principal.id}>
        {principal.name}
      </MenuItem>
    ))
  }

  const renderCategoryOptions = categories => {
    return categories.map(category => (
      <MenuItem value={category.id} key={category.id}>
        {category.name}
      </MenuItem>
    ))
  }

  const judgeActive = targetTag => {
    return creatingConsultation.propertyTags.some(item => item.id === targetTag.id) ? 'active' : ''
  }

  const renderMinorTagBtn = minorPropertyTags => {
    return minorPropertyTags.map(propertyTag => {
      const active = creatingConsultation.propertyTags.some(item => item.id === propertyTag.id)
        ? 'active'
        : ''
      return (
        <Chip className={active} key={propertyTag.id} label={propertyTag.name} size="small" onClick={onTagToggle(propertyTag)} />
      )
    })
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
          // textAlign: 'center',
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
        新增諮詢
      </Typography>

      {
        !member && (
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
        )
      }

      {
        (currentMember && currentMember.pets) && (
          <Autocomplete
            disablePortal
            sx={{ width: '100%' }}
            options={currentMember.pets}
            value={currentPet}
            onChange={onPetChange}
            getOptionLabel={option => option.name}
            renderInput={(params) => <TextField label="寵物名稱" {...params} />}
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

      {!member && (<Divider sx={{ my: 1 }} />)}

      <TextField
        label="負責人"
        required
        select
        variant="outlined"
        error={Boolean(errors.principal)}
        helperText={errors.principal}
        onChange={onPrincipalChange}
        value={(creatingConsultation.principal && creatingConsultation.principal.id) || ''}
      >
        <MenuItem value="" disabled>負責人</MenuItem>
        {renderPrincipalOptions(principals)}
      </TextField>

      <TextField
        label="類別"
        required
        select
        variant="outlined"
        error={Boolean(errors.category)}
        helperText={errors.category}
        onChange={onCategoryChange}
        value={(creatingConsultation.category && creatingConsultation.category.id) || ''}
      >
        <MenuItem value="" disabled>選擇類別</MenuItem>
        {renderCategoryOptions(consultationCategories)}
      </TextField>

      <DateTimePicker
        renderInput={(props) => <TextField required {...props} error={Boolean(errors.remindStart || props.error)} helperText={errors.remindStart} variant="outlined" />}
        minutesStep={5}
        label="提醒開始時間"
        value={creatingConsultation.remindStart}
        inputFormat="yyyy/MM/dd hh:mm a"
        mask="___/__/__ __:__ _M"
        onChange={onRemindChange('remindStart')}
        maxDateTime={creatingConsultation.remindEnd && new Date(creatingConsultation.remindEnd)}
      />

      <DateTimePicker
        renderInput={(props) => <TextField {...props} error={Boolean(errors.remindEnd || props.error)} helperText={errors.remindEnd} className="last-one" variant="outlined" />}
        minutesStep={5}
        label="提醒結束時間"
        value={creatingConsultation.remindEnd}
        inputFormat="yyyy/MM/dd hh:mm a"
        mask="___/__/__ __:__ _M"
        onChange={onRemindChange('remindEnd')}
        minDateTime={creatingConsultation.remindStart && new Date(creatingConsultation.remindStart)}
      />
      {/* {errors.remindEnd && (<FormHelperText error>{errors.remindEnd}</FormHelperText>)} */}

      <TextareaAutosize
        value={creatingConsultation.text || ''}
        placeholder="請輸入文字內容 *"
        onChange={onTextChange}
        maxRows={10}
        minRows={7}
        style={{
          display: 'block',
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          fontSize: '1rem',
          lineHeight: 1.5,
          letterSpacing: '0.00938em',
          padding: '0.375rem 0.75rem',
          borderColor: errors.text ? theme.palette.error.main : 'rgba(0, 0, 0, 0.23)',
          borderRadius: theme.shape.borderRadius,
          outlineColor: theme.palette.primary.main,
        }}
      />
      {errors.text && (<FormHelperText error>{errors.text}</FormHelperText>)}

      <Stack className="chip-wrapper" direction="row" sx={{
        mt: 2,
        mb: 1.5,
        mx: -0.5,
        flexWrap: 'wrap',
        '& .toggle-wrapper': {
          px: 0.5,
          mx: 0.5,
          borderRadius: '1rem',
          border: `1px dashed ${theme.palette.text.fade}`,
          // '& .MuiChip-root:last-of-type': {
          //   mr: 0
          // },
        },
        '& .MuiChip-root': {
          px: 1,
          my: 0.75,
          mx: 0.5,
          bgcolor: 'text.lighter',
        },
        '& .MuiChip-root.active': {
          color: 'text.light',
          bgcolor: 'text.mid',
          '&.red-chip': {
            bgcolor: 'jewelry.red',
          },
          '&.dark-blue-chip': {
            bgcolor: 'jewelry.darkBlue',
          },
          '&.blue-chip': {
            bgcolor: 'jewelry.blue',
          },
          '&.light-blue-chip': {
            bgcolor: 'jewelry.lightBlue',
          },
        },

      }}>
        <Chip label="急" size="small"
          onClick={onTagToggle({ id: 'pt1', name: '急' })}
          className={`red-chip ${judgeActive({ id: 'pt1', name: '急' })}`}
        />
        <Box className="toggle-wrapper">
          <Chip label="重要" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[0])}
            className={`dark-blue-chip ${judgeActive(IMPORTANT_LEVELS[0])}`}
          />
          <Chip label="一般" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[1])}
            className={`blue-chip ${judgeActive(IMPORTANT_LEVELS[1])}`}
          />
          <Chip label="次要" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[2])}
            className={`light-blue-chip ${judgeActive(IMPORTANT_LEVELS[2])}`}
          />
        </Box>
        {renderMinorTagBtn(minorPropertyTags)}
      </Stack>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={onConfirmClick}
          sx={{ mt: 2, mb: 1, '&:hover': { bgcolor: 'secondary.light' } }}
        >
          確認
        </Button>
      </Box>

    </Popover >
  )
}

export default CreatePopover
