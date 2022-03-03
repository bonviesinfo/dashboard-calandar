import React, { useMemo, useState, useEffect } from 'react'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CageCardList from '../components/CageBoard/CageCardList'
import ControlMenu from '../components/CageBoard/ControlMenu'
import NullCageMenu from '../components/CageBoard/NullCageMenu'
import EnterPopover from '../components/CageBoard/EnterPopover'
import CustomizedDatePicker from '../components/CageBoard/CustomizedDatePicker'
import { dummyCageData } from '../constants/dummyCageData'

const cageSetting = {
  col: 6,
  row: 3,
}

const filterCageDate = date => {
  return dummyCageData.filter(cage => {
    return new Date(cage.start).toLocaleDateString() === new Date(date).toLocaleDateString()
  })
}

function CageBoard(props) {
  const theme = useTheme()
  const [cages, setCages] = useState([])
  const [currentCage, setCurrentCage] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [nullAnchorEl, setNullAnchorEl] = useState(null)
  const [enterAnchorEl, setEnterAnchorEl] = useState(null)

  const cageMapping = useMemo(() => {
    const cageMapping = {}
    cages.forEach(item => {
      cageMapping[item.serial] = item
    })
    return cageMapping
  }, [cages])


  const totalCageArray = useMemo(() => {
    return Array.from(new Array(cageSetting.col * cageSetting.row))
  }, [])

  useEffect(() => {
    setCages(
      filterCageDate(new Date())
    )
  }, [])

  const handleClick = cage => event => {
    setCurrentCage(cage)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setCurrentCage(null)
    setAnchorEl(null)
  }

  const onCageClear = () => {
    if (!currentCage) return
    setCages(prev => prev.filter(cage => cage.id !== currentCage.id))
    handleClose()
  }

  const onCageChange = serial => {
    if (!currentCage) return
    if (serial > totalCageArray.length || Number.isNaN(+serial)) return

    setCages(prev => {
      let newCages = prev.map(cage => cage.id === currentCage.id ? { ...cage, serial } : cage)
      if (cageMapping[serial]) {
        newCages = newCages.map(cage => cage.id === cageMapping[serial].id ? { ...cage, serial: currentCage.serial } : cage
        )
      }
      return newCages
    })

    handleClose()
  }

  // 開啟及關閉進籠窗
  const open = Boolean(anchorEl)
  const enterOpen = Boolean(enterAnchorEl)
  const nullOpen = Boolean(nullAnchorEl)

  // const handleCreateClick = (e) => {
  //   setEnterAnchorEl(e.currentTarget)
  // }

  const handleCreateClose = () => {
    setEnterAnchorEl(null)
  }

  const handleNullClick = (event) => {
    setNullAnchorEl(event.currentTarget)
  }

  const handleNullClose = () => {
    setNullAnchorEl(null)
  }

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 3 },
        minHeight: '100vh',
        userSelect: 'none',
        overflowX: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-10vh',
          left: 0,
          width: '125%',
          height: '60vh',
          zIndex: -1,
          transform: 'Rotate(-3deg)',
          bgcolor: alpha(theme.palette.primary.light, 0.15),
        },
        '& .cage-grid': {
          position: 'relative',
          '&::before': {
            position: 'absolute',
            top: '-0.5rem',
            left: '0.5rem',
            width: 'auto',
            fontSize: '4rem',
            fontWeight: 'bold',
            letterSpacing: '0.025em',
            color: '#cccccc',
            zIndex: 10,
            textShadow: theme => `2px 2px 1px ${theme.palette.background.default}`,
          },
        },
        '& .MuiCard-root': {
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          height: '100%',
          minHeight: 200,
          position: 'relative',
        },
        '& .MuiCard-root.null-cage': {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'text.disabled',
        },
        '& .control-btn': {
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 10,
          color: 'text.disabled',
        },
        '& .card-content': {
          px: 2,
          pt: 1.5,
          pb: 2.5,
          flex: '1 0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          minWidth: 0,
          '& > div': {
            display: 'flex',
            alignItems: 'center',
            py: 0.5,
          },
          '& .MuiSvgIcon-root': {
            width: 22.5,
            height: 22.5,
          },
          '& span': {
            px: 0.5,
          },
        },
        '& .card-action': {
          px: 1,
          width: '100%',
          flexGrow: 1,
          flexWrap: 'wrap',
          bgcolor: theme.palette.background.foggy,
          '& > div': {
            pr: 1,
            display: 'inline-flex',
            alignItems: 'center',
          },
          '& .MuiTypography-root': {
            pl: 1,
          },
        },
        '& .orange': {
          color: '#ffbe98',
        },
        '& .yellow': {
          color: '#ffe66d',
        },
        '& .blue': {
          color: '#84ddff',
        },
      }}
    >
      <Box sx={{
        width: '90%',
        m: '0 auto',

      }}>

        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', }}>

          <Typography variant="h4" component="h1" color="primary" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            籠位管理
          </Typography>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            '& .MuiOutlinedInput-input': {
              py: 1.375,
              width: 125,
              fontSize: '1rem',
            },
            '& .search-btn': {
              ml: 2,
              fontSize: '1.125rem',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              color: 'background.paper',
              bgcolor: theme => alpha(theme.palette.primary.main, 0.7),
              '&:hover': {
                bgcolor: theme => alpha(theme.palette.primary.main, 0.8),
              },
              '& .MuiButton-startIcon svg': { fontSize: '1.25rem' },
            },
          }}>

            <CustomizedDatePicker
              setCages={setCages}
              filterCageDate={filterCageDate}
            />
          </Box>

        </Box>

        <Box sx={{
          overflowX: 'auto',
          borderRadius: 2,
          bgcolor: alpha(theme.palette.text.lightest, 0.6),
          border: `1px solid ${theme.palette.text.lighter}`,

        }}>
          <Box sx={{
            pt: 3,
            px: 4,
            pb: 5,
            minWidth: { md: cageSetting.col * 200 },
          }}>
            <Grid container spacing={3} columns={cageSetting.col}>
              <CageCardList
                cageSetting={cageSetting}
                cages={cages}
                handleClick={handleClick}
                cageMapping={cageMapping}
                totalCageArray={totalCageArray}
                handleNullClick={handleNullClick}
              />
            </Grid>
          </Box>
        </Box>

        <EnterPopover
          disableEscapeKeyDown
          open={enterOpen}
          anchorEl={enterAnchorEl}
          onClose={handleCreateClose}
        />

        <ControlMenu
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleCageClear={onCageClear}
          handleCageChange={onCageChange}
        />

        <NullCageMenu
          open={nullOpen}
          anchorEl={nullAnchorEl}
          handleClose={handleNullClose}
        />
      </Box>

    </Box>
  )
}

export default CageBoard