import React, { useState, useEffect, useMemo } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import { nanoid } from '@reduxjs/toolkit'
import { omit } from 'lodash-es'
import { TransitionGroup } from 'react-transition-group'
import { useTheme, alpha } from '@mui/material/styles'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectConsultations, updateConsultation, deleteConsultation, toggleConsultationExpanded, toggleConsultationCompleted, transferConsultationPrincipal } from '../../slices/consultationsSlice'
// import { format } from 'date-fns'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import DateTimePicker from '@mui/lab/DateTimePicker'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import CheckIcon from '@mui/icons-material/Check'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import MemberInfo from '../../components/UI/MemberInfo'
import MemberTooltip from '../../components/ConsultationManage/MemberTooltip'
import PetTooltip from '../../components/ConsultationManage/PetTooltip'
import DisplayToggleButton from '../../components/ConsultationManage/DisplayToggleButton'
import CategoryToggleButton from '../../components/ConsultationManage/CategoryToggleButton'
import CreatePopover from '../../components/ConsultationManage/CreatePopover'
import DeletePopover from '../../components/ConsultationManage/DeletePopover'
import { dummyMember, principals, principalMapping, consultationCategories, consultationMapping, minorPropertyTags, IMPORTANT_CLASS_MAPPING, IMPORTANT_LEVELS, IMPORTANT_LEVEL_IDS } from '../../data/dummyConsultationData'

// ??????????????????
const getLocaleDateString = timestamp => {
  const newLocaleDateString = new Date(timestamp).toLocaleString()
  return newLocaleDateString.replace('???', '??? ').slice(0, -3)
}

// ??????????????????
const filterData = (data, selected) => {
  if (!selected) { return data }
  else if (selected === 'undone') {
    return data.filter(item => !item.isCompleted)
  }
  else if (selected === 'done') {
    return data.filter(item => item.isCompleted)
  }
  else if (selected === 'transferred') {
    return data.filter(item => item.transferredAt)
  }
  else {
    return []
  }
}

const filterCategory = (data, selected) => {
  if (!selected) { return data }
  return data.filter(item => item.category.id === selected)
}

function ConsultationMange() {
  const theme = useTheme()
  const [member, setMember] = useState(null)
  const [errors, setErrors] = useState({})
  const [editingItem, setEditingItem] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [deleteEl, setDeleteEl] = useState(null)
  const [selectedDisplay, setSelectedDisplay] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const dispatch = useDispatch()
  const consultations = useSelector(selectConsultations)

  const [searchParams] = useSearchParams()
  const memberId = searchParams.get('memberId')

  useEffect(() => {
    if (memberId) {
      setMember(dummyMember)
    }
  }, [memberId])

  const filteredData = useMemo(() => {
    return consultations
      ? filterCategory(filterData(consultations, selectedDisplay), selectedCategory)
      : []
  }, [consultations, selectedDisplay, selectedCategory])

  // ????????????
  const onExpandedChange = (id, isEditing) => (event, isExpanded) => {
    dispatch(toggleConsultationExpanded({ id, isEditing }))
  }

  // ??????????????????
  const onSelectDisplay = (event, newSelectedDisplay) => {
    if (newSelectedDisplay !== null) {
      setSelectedDisplay(newSelectedDisplay);
    }
  }

  const onSelectCategory = e => {
    setSelectedCategory(e.target.value)
  }

  // ?????????????????????
  const onCompletedToggle = item => e => {
    e.stopPropagation()
    dispatch(toggleConsultationCompleted(item.id))
    if (item.id === editingItem.id) setEditingItem({})
  }

  // ??????????????????????????????
  const handleCreateClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCreateClose = () => {
    setAnchorEl(null)
  }

  // ??????????????????????????????
  const handleDeleteClick = (e) => {
    e.stopPropagation()
    setDeleteEl(e.currentTarget)
  }
  const handleDeleteClose = () => {
    setDeleteEl(null)
  }

  const onDeleteConfirm = id => {
    dispatch(deleteConsultation(id))
  }

  const createOpen = Boolean(anchorEl)
  const deleteOpen = Boolean(deleteEl)

  // ???????????? Function
  const onEditClick = item => e => {
    e.stopPropagation()
    const { remindStart, remindEnd, ...restProperty } = item
    setEditingItem({
      ...restProperty,
      remindStart: new Date(remindStart),
      remindEnd: remindEnd ? new Date(remindEnd) : null,
    })
    // ?????????????????????
    onExpandedChange(item.id, Boolean(item.id))()
    setErrors({})
  }

  const onEditCancel = e => {
    e.stopPropagation()
    setEditingItem({})
    setErrors({})
  }

  const validateConsultation = () => {
    const newErrors = {}
    if (!editingItem.principal) newErrors.principal = '??????????????????'
    if (!editingItem.category) newErrors.category = '???????????????'
    if (!editingItem.text) newErrors.text = '?????????????????????'

    if (!editingItem.remindStart) {
      newErrors.remindStart = '???????????????????????????'
    }
    else if (!(editingItem.remindStart instanceof Date) || isNaN(editingItem.remindStart)) {
      newErrors.remindStart = '??????????????????'
    }

    if (editingItem.remindEnd && (
      !(editingItem.remindEnd instanceof Date) || isNaN(editingItem.remindEnd)
    )) {
      newErrors.remindEnd = '??????????????????????????????????????????'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length > 0
  }

  const onEditConfirm = e => {
    e.stopPropagation()
    if (validateConsultation()) return
    const newConsultation = {
      ...editingItem,
      ...(editingItem.remindEnd && { remindEnd: new Date(editingItem.remindEnd).getTime() }),
      remindStart: new Date(editingItem.remindStart).getTime(),
    }
    dispatch(updateConsultation(newConsultation))
    setEditingItem({})
  }

  // ???????????????
  // ??? select ???????????? option ????????? e.stopPropagation()
  const transferPrincipal = e => {
    e.stopPropagation()
    if (validateConsultation()) return
    const newConsultation = {
      ...editingItem,
      id: nanoid(),
      principal: {
        ...editingItem.principal,
        id: e.target.value,
        name: principalMapping[e.target.value]
      },
      ...(editingItem.remindEnd && { remindEnd: new Date(editingItem.remindEnd).getTime() }),
      remindStart: new Date(editingItem.remindStart).getTime(),
    }
    dispatch(transferConsultationPrincipal({ newConsultation, id: editingItem.id }))
    setEditingItem({})
  }

  const renderPrincipalOptions = principals => {
    return principals.map(principal => (
      <MenuItem key={principal.id} value={principal.id} onClick={e => e.stopPropagation()}>
        {principal.name}
      </MenuItem>
    ))
  }

  // ????????????
  const onCategoryChange = e => {
    setErrors(omit(errors, 'category'))
    const newEditingItem = {
      ...editingItem,
      category: {
        ...editingItem.category,
        id: e.target.value,
        name: consultationMapping[e.target.value]
      }
    }
    setEditingItem(newEditingItem)
  }

  const renderCategoryOptions = categories => {
    return categories.map(category => (
      <MenuItem key={category.id} value={category.id} onClick={e => e.stopPropagation()}>
        {category.name}
      </MenuItem>
    ))
  }

  // ??????????????????
  const onTextChange = e => {
    setErrors(omit(errors, 'text'))
    const newEditingItem = {
      ...editingItem,
      text: e.target.value,
    }
    setEditingItem(newEditingItem)
  }

  // ??????????????????
  const onRemindChange = name => newValue => {
    setErrors(omit(errors, name))
    setEditingItem((prev) => ({
      ...prev,
      [name]: newValue,
    }))
  }

  // ??????????????????
  const onTagToggle = targetTag => () => {
    setEditingItem((prev) => ({
      ...prev,
      propertyTags: prev.propertyTags.some(item => item.id === targetTag.id)
        ? prev.propertyTags.filter(item => item.id !== targetTag.id)
        : [...prev.propertyTags, targetTag]
    }))
  }

  const onImportantLevelRadio = targetTag => () => {
    if (editingItem.propertyTags.some(item => item.id === targetTag.id)) return
    const clearedPropertyTag = editingItem.propertyTags.filter(item => !IMPORTANT_LEVEL_IDS.includes(item.id))

    setEditingItem((prev) => ({
      ...prev,
      propertyTags: [...clearedPropertyTag, targetTag]
    }))
  }

  // const formatRemindTime = inputTime => {
  //   const formatTime = inputTime && format(new Date(inputTime), "yyyy-MM-dd'T'hh:mm")
  //   return formatTime
  // }

  // const onRemindTimeChange = e => {
  //   const newEditingItem = {
  //     ...editingItem,
  //     [e.target.name]: new Date(e.target.value).getTime()
  //   }
  //   setEditingItem(newEditingItem)
  // }


  const renderIconButton = (item, isCompleted, isEditing) => {
    if (isCompleted) {
      return (
        <React.Fragment>
          <IconButton aria-label="delete" onClick={handleDeleteClick} data-id={item.id}>
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={onCompletedToggle(item)}>
            <ReplayOutlinedIcon />
          </IconButton>
        </React.Fragment>
      )
    } else if (isEditing) {
      return (
        <React.Fragment>
          <Button className="cancel-btn" variant="contained" size="small" color="inherit" disableElevation={true} onClick={onEditCancel}>??????</Button>
          <Button variant="contained" size="small" color="inherit" disableElevation={true} onClick={onEditConfirm}>??????</Button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <IconButton aria-label="edit" onClick={onEditClick(item)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteClick} data-id={item.id}>
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton aria-label="complete" onClick={onCompletedToggle(item)} className="obvious">
            <CheckIcon />
          </IconButton>
        </React.Fragment>
      )
    }
  }

  const renderChipWrapper = (item, isCompleted, isEditing) => {
    if (isEditing) {
      return (
        <Stack className="chip-wrapper" direction="row" spacing={1}>
          {renderTagBtns()}
        </Stack>
      )
    } else {
      return (
        <Stack className={`chip-wrapper${isCompleted}`} direction="row" spacing={1}>
          {renderTags(item)}
        </Stack>
      )
    }
  }

  const judgeActive = targetTag => {
    return editingItem.propertyTags.some(item => item.id === targetTag.id) ? '' : 'negative'
  }

  const renderTags = consultation => {
    let minors = []
    let isUrgent = false
    let importantLevel = null

    consultation.propertyTags.forEach(item => {
      if (item.id === 'pt1') {
        isUrgent = true
      } else if (['pt2', 'pt3', 'pt4'].includes(item.id)) {
        importantLevel = item
      } else {
        minors.push(item)
      }
    })

    const minorTags = minors.map(minor => (
      <Chip key={minor.id} label={minor.name} size="small" />
    ))

    return (
      <React.Fragment>
        <Chip label="???" className={isUrgent ? 'red' : 'plain'} size="small" />
        <Chip label={importantLevel.name} className={IMPORTANT_CLASS_MAPPING[importantLevel.id]} size="small" />
        {minorTags}
      </React.Fragment>
    )
  }

  const renderTagBtns = consultation => {
    const minorTagBtns = minorPropertyTags.map(propertyTag => {
      const active = editingItem.propertyTags.some(item => item.id === propertyTag.id)
        ? ''
        : 'negative'
      return (
        <Chip className={active} key={propertyTag.id} label={propertyTag.name} size="small" onClick={onTagToggle(propertyTag)} />
      )
    })

    return (
      <React.Fragment>
        <Chip label="???" size="small"
          onClick={onTagToggle({ id: 'pt1', name: '???' })}
          className={`red ${judgeActive({ id: 'pt1', name: '???' })}`}
        />
        <Box className="toggle-wrapper">
          <Chip label="??????" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[0])}
            className={`dark-blue ${judgeActive(IMPORTANT_LEVELS[0])}`}
          />
          <Chip label="??????" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[1])}
            className={`blue ${judgeActive(IMPORTANT_LEVELS[1])}`}
          />
          <Chip label="??????" size="small"
            onClick={onImportantLevelRadio(IMPORTANT_LEVELS[2])}
            className={`light-blue ${judgeActive(IMPORTANT_LEVELS[2])}`}
          />
        </Box>
        {minorTagBtns}
      </React.Fragment>
    )
  }

  const renderDateGroup = (item, isCompleted, isEditing) => {
    if (isCompleted) {
      return item.transferredAt
        ? (
          <React.Fragment>
            <div className="record-date">
              <span className="obvious">????????? :&nbsp;</span>
              <span className="obvious">????????????</span>
            </div>
            <span>|</span>
            <div className="record-date">
              <span className="obvious">???????????? :&nbsp;</span>
              <span className="obvious">{getLocaleDateString(item.transferredAt)}</span>
            </div>
          </React.Fragment>
        )
        : (
          <div className="record-date">
            <span className="obvious">???????????? :&nbsp;</span>
            <span className="obvious">{getLocaleDateString(item.completedAt)}</span>
          </div>
        )
    } else if (isEditing) {
      return (
        <React.Fragment>
          <div className="remind-date">
            <TimerOutlinedIcon className="date-icon" fontSize="small" />
            <span>???????????? :&nbsp;</span>
            {/* <input
              type="datetime-local"
              name="remindStart"
              onChange={onRemindTimeChange}
              value={formatRemindTime(editingItem.remindStart) || ''}
              max={editingItem.remindEnd && formatRemindTime(editingItem.remindEnd)}
            /> */}
            <div>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} error={Boolean(errors.remindStart || props.error)} helperText={errors.remindStart} variant="outlined" />}
                minutesStep={5}
                value={editingItem.remindStart}
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                onChange={onRemindChange('remindStart')}
                maxDateTime={editingItem.remindEnd && new Date(editingItem.remindEnd)}
              />
            </div>
            <span>&nbsp;-&nbsp;</span>
            {/* <input
              type="datetime-local"
              name="remindEnd"
              onChange={onRemindTimeChange}
              value={formatRemindTime(editingItem.remindEnd) || ''}
              min={editingItem.remindStart && formatRemindTime(editingItem.remindStart)}
            /> */}
            <DateTimePicker
              renderInput={(props) => <TextField {...props} error={Boolean(errors.remindEnd || props.error)} helperText={errors.remindEnd} className="last-one" variant="outlined" />}
              minutesStep={5}
              value={editingItem.remindEnd}
              inputFormat="yyyy/MM/dd hh:mm a"
              mask="___/__/__ __:__ _M"
              onChange={onRemindChange('remindEnd')}
              minDateTime={editingItem.remindStart && new Date(editingItem.remindStart)}
            />
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <div className="record-date">
            <RateReviewOutlinedIcon className="date-icon" fontSize="small" />
            <span>???????????? :&nbsp;</span>
            <span>{getLocaleDateString(item.recordedAt)}</span>
          </div>
          <span>|</span>
          <div className="remind-date">
            <TimerOutlinedIcon className="date-icon" fontSize="small" />
            <span>???????????? :&nbsp;</span>
            <span className="obvious">{item.remindStart && getLocaleDateString(item.remindStart)}</span>
            {item.remindEnd && (
              <React.Fragment>
                <span>&nbsp;-&nbsp;</span>
                <span className="obvious">{getLocaleDateString(item.remindEnd)}</span>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )
    }
  }

  const currentTimestamp = new Date().getTime()

  const renderConsultations = data => {
    return data.map((item, index) => {
      const isCompleted = item.isCompleted ? ' completed' : ''
      const isEditing = (editingItem.id === item.id) && !item.isCompleted ? ' editing' : ''

      const isExpired = item.remindEnd && (item.remindEnd < currentTimestamp) ? 'expired' : ''

      return (
        <Collapse key={item.id} timeout={500}>
          <div className={`accordion-wrapper${isCompleted}`}>

            <Accordion
              disableGutters
              elevation={0}
              expanded={item.isExpanded}
              onChange={onExpandedChange(item.id, isEditing)}
              // defaultExpanded={!Boolean(isCompleted)}
              key={index}
            >
              <AccordionSummary className={`${isExpired}${isCompleted}${isEditing}`} expandIcon={null}>
                <Grid container className="consultation-info">

                  <Grid item className="info-group">
                    <div className="serial-sec">
                      {index + 1}
                    </div>
                    <div className="info-sec-wrapper">
                      {isEditing
                        ? (
                          <React.Fragment>
                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                ????????? :&nbsp;
                              </Typography>
                              <TextField
                                select
                                className="principal"
                                value={(editingItem.principal && editingItem.principal.id) || ''}
                                onChange={transferPrincipal}
                                error={Boolean(errors.principal)}
                                helperText={errors.principal}
                              >
                                <MenuItem value="" disabled>?????????</MenuItem>
                                {renderPrincipalOptions(principals)}
                              </TextField>
                            </div>

                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                ?????? :&nbsp;
                              </Typography>
                              <TextField
                                select
                                value={(editingItem.category && editingItem.category.id) || ''}
                                onChange={onCategoryChange}
                                error={Boolean(errors.category)}
                                helperText={errors.category}
                              >
                                <MenuItem value="" disabled>????????????</MenuItem>
                                {renderCategoryOptions(consultationCategories)}
                              </TextField>
                            </div>

                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                ???????????? :&nbsp;
                              </Typography>
                              <Typography className="info-content" variant="subtitle1" component="span">
                                ?????????
                              </Typography>
                            </div>

                            {!member && (
                              <MemberTooltip
                                member={item.member}
                                arrow
                                PopperProps={{
                                  onClick: e => e.stopPropagation(),
                                }}>
                                <div className="info-sec">
                                  <Typography className="info-title" variant="subtitle1" component="span">
                                    ???????????? :&nbsp;
                                  </Typography>
                                  <Typography className="info-content" variant="subtitle1" component="span">
                                    {item.member && item.member.name}
                                  </Typography>
                                </div>
                              </MemberTooltip>
                            )}

                            {item.pet && (
                              <PetTooltip
                                pet={item.pet}
                                arrow
                                PopperProps={{
                                  onClick: e => e.stopPropagation(),
                                }}
                              >
                                <div className="info-sec">
                                  <Typography className="info-title" variant="subtitle1" component="span">
                                    ????????? :&nbsp;
                                  </Typography>
                                  <Typography className="info-content" variant="subtitle1" component="span">
                                    {item.pet.name}
                                  </Typography>
                                </div>
                              </PetTooltip>
                            )}

                          </React.Fragment>
                        )
                        : (
                          <React.Fragment>
                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                ????????? :&nbsp;
                              </Typography>
                              <Typography className="info-content" variant="subtitle1" component="span">
                                {item.principal && item.principal.name}
                              </Typography>
                            </div>

                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                ?????? :&nbsp;
                              </Typography>
                              <Typography className="info-content" variant="subtitle1" component="span">
                                {item.category && item.category.name}
                              </Typography>
                            </div>

                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                ???????????? :&nbsp;
                              </Typography>
                              <Typography className="info-content" variant="subtitle1" component="span">
                                ?????????
                              </Typography>
                            </div>

                            {!member && (
                              <MemberTooltip
                                member={item.member}
                                arrow
                                PopperProps={{
                                  onClick: e => e.stopPropagation(),
                                }}>
                                <div className="info-sec">
                                  <Typography className="info-title" variant="subtitle1" component="span">
                                    ???????????? :&nbsp;
                                  </Typography>
                                  <Typography className="info-content" variant="subtitle1" component="span">
                                    {item.member && item.member.name}
                                  </Typography>
                                </div>
                              </MemberTooltip>
                            )}

                            {item.pet && (
                              <PetTooltip
                                pet={item.pet}
                                arrow
                                PopperProps={{
                                  onClick: e => e.stopPropagation(),
                                }}
                              >
                                <div className="info-sec">
                                  <Typography className="info-title" variant="subtitle1" component="span">
                                    ????????? :&nbsp;
                                  </Typography>
                                  <Typography className="info-content" variant="subtitle1" component="span">
                                    {item.pet.name}
                                  </Typography>
                                </div>
                              </PetTooltip>
                            )}

                            <div className="info-sec">
                              <Typography className="info-title" variant="subtitle1" component="span">
                                {isCompleted ? (item.transferredAt ? '?????????' : '?????????') : (isExpired ? '?????????' : '?????????')}
                              </Typography>
                            </div>
                          </React.Fragment>
                        )
                      }

                    </div>
                  </Grid>

                  <Grid className="control-group" item>
                    {/* <Box className="id-field">
                      hu2chuie-3rd5-34dv-3nml
                    </Box> */}
                    <Box className="icon-field">
                      {renderIconButton(item, isCompleted, isEditing)}
                    </Box>
                  </Grid>

                </Grid>
              </AccordionSummary>

              <AccordionDetails className={isCompleted}>
                {isEditing
                  ? (
                    <TextareaAutosize
                      className={`text-area${errors.text ? ' error' : ''}`}
                      placeholder={errors.text}
                      maxRows={10}
                      minRows={4}
                      value={editingItem.text}
                      onChange={onTextChange}
                    // {...(errors.text && { style: { border: `2px solid ${theme.palette.error.light}` } })}
                    />
                  )
                  : (
                    <div className="accordion-content">
                      {item.text}
                    </div>
                  )
                }
              </AccordionDetails>
            </Accordion>

            <div className={`accordion-actions`}>

              {renderChipWrapper(item, isCompleted, isEditing)}

              <div className="date-group">
                {renderDateGroup(item, isCompleted, isEditing)}
              </div>
            </div>
          </div>

        </Collapse>
      )
    })
  }

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 4, lg: 10 },
        '& .accordion-wrapper': {
          overflow: 'auto',
          borderRadius: '0.5rem',
          border: `1px solid ${theme.palette.divider}`,
          mb: 4,
        },
        '& .MuiAccordion-root': {
          '&:before': {
            display: 'none',
          },
        },
        '& .MuiAccordionSummary-root': {
          pl: 0,
          backgroundColor: 'primary.text',
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
          },
          '& .MuiAccordionSummary-expandIconWrapper svg': {
            color: 'text.light',
            fontSize: '0.9rem',
          },
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
          '&.expired': {
            bgcolor: alpha(theme.palette.primary.text, 0.6),
          },
          '&.completed': {
            bgcolor: 'text.fade',
          },
          '&.editing': {
            bgcolor: 'primary.editingBg',
          },
          '&.editing .consultation-info': {
            color: 'text.secondary',
          },
        },
        '& .MuiAccordionDetails-root': {
          padding: 0,
          overflow: 'auto',
          bgcolor: 'background.default',
          '&.completed': {
            color: 'text.disabled',
            bgcolor: 'background.light',
          },
        },
        '& .consultation-info': {
          color: 'text.light',
          justifyContent: {
            xs: 'center',
            md: 'space-between',
          },
        },
        '& .info-group': {
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          '& > div': {
            display: 'inline-block',
          }
        },
        '& .serial-sec': {
          flex: '0 0 4rem',
          display: 'inline-flex',
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          padding: '0 1em',
          minWidth: 0,
        },
        '& .info-sec': {
          display: 'inline-flex',
          alignItems: 'center',
          pr: 2.5,
          '& .info-title': {
            fontWeight: 'bold',
          },
          '& .MuiSelect-select': {
            py: 0.25,
            bgcolor: alpha(theme.palette.background.paper, 0.2),
          },
          '& .principal .MuiSelect-select': {
            fontWeight: 'bold',
          },
        },
        '& .control-group': {
          display: 'flex',
          alignItems: 'center',
        },
        '& .id-field': {
          pr: 0.5,
          fontSize: '0.875rem',
          letterSpacing: '0.04em',
        },
        '& .icon-field': {
          display: 'flex',
          alignItems: 'center',
          px: 0.75,
          maxHeight: '3rem',
          overflow: 'visible',
          '& .MuiButton-root': {
            mx: 0.5,
            px: 3,
            bgcolor: 'background.paper',
            border: `2px solid ${theme.palette.text.fade}`,
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: alpha(theme.palette.background.paper, 0.9),
            },
          },

          '& .MuiButton-root.cancel-btn': {
            bgcolor: alpha(theme.palette.background.paper, 0.6),
            '&:hover': {
              bgcolor: alpha(theme.palette.background.paper, 0.5),
            },
          },
          '& .MuiIconButton-root': {
            color: 'text.light',
          },
          '& .MuiIconButton-root.obvious': {
            ml: 1,
            bgcolor: 'secondary.light',
            border: `4px solid ${theme.palette.background.paper}`
          },
          '& .MuiIconButton-root.obvious svg': {
            fontSize: '3rem',
          },
        },
        '& .accordion-content': {
          py: 1.5,
          px: 2.5,
          whiteSpace: 'pre-line',
        },
        '& .text-area': {
          py: 1.5,
          px: 2.5,
          display: 'block',
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          border: 'none',
          fontSize: '1rem',
          lineHeight: 1.5,
          letterSpacing: '0.00938em',
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          color: 'text.third',
        },
        '& .text-area.error': {
          border: `1px solid ${alpha(theme.palette.error.light, 0.6)}`,
        },
        '& .text-area.error::placeholder': {
          color: alpha(theme.palette.error.light, 0.6),
        },
        '& .accordion-actions': {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          bgcolor: 'grey.100',
        },
        '& .toggle-wrapper': {
          px: 0.5,
          mx: 0.5,
          borderRadius: '1rem',
          border: `1px dashed ${theme.palette.text.fade}`,
        },
        '& .chip-wrapper': {
          px: 2.5,
          py: 0.5,
          mx: -0.5,
          alignItems: 'center',
          '& .MuiChip-root': {
            mx: 0.5,
            my: 0.5,
            color: 'text.light',
            bgcolor: 'text.mid',
          },
          '& .MuiChip-label': {
            px: 2,
          },
          '& .plain': {
            color: 'text.fade',
            bgcolor: 'inherit',
            border: `1px solid ${theme.palette.text.fade}`,
          },
          '& .red': { bgcolor: 'jewelry.red' },
          '& .blue': { bgcolor: 'jewelry.blue' },
          '& .dark-blue': { bgcolor: 'jewelry.darkBlue' },
          '& .light-blue': { bgcolor: 'jewelry.lightBlue' },
          '& .negative': {
            color: 'text.primary',
            bgcolor: 'text.fadest',
          },
        },
        '& .chip-wrapper.completed': {
          '& .MuiChip-root': { bgcolor: alpha(theme.palette.text.mid, 0.25) },
          '& .plain': {
            bgcolor: 'inherit',
            color: alpha(theme.palette.text.mid, 0.25),
            border: `1px solid ${alpha(theme.palette.text.mid, 0.25)}`,
          },
          '& .red': { bgcolor: alpha(theme.palette.jewelry.red, 0.25) },
          '& .blue': { bgcolor: alpha(theme.palette.jewelry.blue, 0.25) },
          '& .dark-blue': { bgcolor: alpha(theme.palette.jewelry.darkBlue, 0.25) },
          '& .light-blue': { bgcolor: alpha(theme.palette.jewelry.lightBlue, 0.25) },
        },
        '& .date-group': {
          display: 'flex',
          alignItems: 'center',
          color: 'text.third',
          px: 1,
          '& > div': {
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.5,
          },
          '& .MuiFormControl-root': {
            py: 1,
          },
          '& .MuiOutlinedInput-input': {
            py: 0.25,
          },
          '& .MuiFormHelperText-root': {
            mt: 0,
          },
          '& svg.date-icon': { mr: 0.75 },
          '& span': { display: 'inline-block' },
          '& span.obvious': {
            fontWeight: 'bold',
          },
        },
      }}
    >
      <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', pb: 1, color: 'text.secondary' }}>
        ????????????
      </Typography>

      {member && <MemberInfo member={member} />}

      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DisplayToggleButton
            selected={selectedDisplay}
            onSelected={onSelectDisplay}
          />
          <CategoryToggleButton
            selected={selectedCategory}
            onSelected={onSelectCategory}
          />
        </Box>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCreateClick}
          sx={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: 'secondary.darkText',
            '& .MuiButton-startIcon svg': { fontSize: '1.25rem' },
          }}
          startIcon={<AddCircleIcon />}
        >
          ??????????????????
        </Button>
      </Box>

      <CreatePopover
        disableEscapeKeyDown
        open={createOpen}
        anchorEl={anchorEl}
        member={member}
        onClose={handleCreateClose}
      />

      <DeletePopover
        open={deleteOpen}
        anchorEl={deleteEl}
        onClose={handleDeleteClose}
        onDeleteConfirm={onDeleteConfirm}
      />

      <Box sx={{ overflow: 'auto', pb: 6 }}>

        <TransitionGroup>
          {renderConsultations(filteredData)}
        </TransitionGroup>

        {(filteredData.length <= 0) && (
          <Typography variant="h3" sx={{
            pt: 10,
            fontWeight: 'bold',
            textAlign: 'center',
            letterSpacing: '0.1em',
            color: 'text.fade',
          }}>
            ???????????????
          </Typography>
        )
        }
      </Box>
    </Box>
  )
}

export default ConsultationMange
