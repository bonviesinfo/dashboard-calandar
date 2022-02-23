import React, { useMemo, useState, useEffect } from 'react'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CageCard, CageNullCard } from '../components/CageBoard/CageCard'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ControlMenu from '../components/CageBoard/ControlMenu'
import EnterPopover from '../components/CageBoard/EnterPopover'

const cageSetting = {
  col: 6,
  row: 3,
}

const dummyData = [
  {
    id: 'cr1',
    serial: 1,
    content: '安親',
    pet: {
      petName: 'Bobby',
      petAge: 2,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/70/226625536_551abc895a_n.jpg',
    },
  },
  {
    id: 'cr2',
    serial: 12,
    content: '住院',
    pet: {
      petName: 'Moceil',
      petAge: 4,
      petCategory: 'Dog',
      avatar: 'https://live.staticflickr.com/1808/42312338234_efeddcb88f_n.jpg',
    },
  },
  {
    id: 'cr3',
    serial: 8,
    content: '住院',
    pet: {
      petName: 'Mimi',
      petAge: 6,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/2833/11998821256_ed10ca5d83_n.jpg',
    },
  },
  {
    id: 'cr4',
    serial: 5,
    content: '安親',
    pet: {
      petName: 'Chi Chi',
      petAge: 3,
      petCategory: 'Dog',
    },
  },
]

function CageBoard(props) {
  const theme = useTheme()
  const [cages, setCages] = useState([])
  const [currentCage, setCurrentCage] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
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
    setCages(dummyData)
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
  const enterOpen = Boolean(enterAnchorEl)

  const handleCreateClick = (e) => {
    setEnterAnchorEl(e.currentTarget)
  }

  const handleCreateClose = () => {
    setEnterAnchorEl(null)
  }

  const renderedCards = totalCageArray.map((item, index) => {
    return cageMapping[index + 1]
      ? (
        <CageCard
          key={cageMapping[index + 1].id || index}
          serial={index + 1}
          fill={cageSetting.col > 3}
          info={cageMapping[index + 1]}
          handleClick={handleClick(cageMapping[index + 1])}
        />
      ) : (
        <CageNullCard
          key={index}
          serial={index + 1}
        />
      )
  })

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 3 },
        minHeight: '100vh',
        userSelect: 'none',
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
          '&.null-cage': {
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.disabled',
          },
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
      <Box sx={{ width: '90%', m: '0 auto', }}>

        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', }}>

          <Typography variant="h4" component="h1" color="primary" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
            籠位管理
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              onClick={handleCreateClick}
              startIcon={<AddCircleIcon />}
              sx={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                color: 'background.paper',
                bgcolor: theme => alpha(theme.palette.primary.main, 0.7),
                '&:hover': {
                  bgcolor: theme => alpha(theme.palette.primary.main, 0.8),
                },
                '& .MuiButton-startIcon svg': { fontSize: '1.25rem' },
              }}
            >
              寵物入籠
            </Button>
          </Box>

        </Box>

        <Box sx={{
          overflowX: 'auto',
          borderRadius: 2,
          border: '1px solid #efefef',
        }}>
          <Box sx={{
            pt: 3,
            px: 4,
            pb: 5,
            minWidth: { md: cageSetting.col * 200 },
          }}>
            <Grid container spacing={3} columns={cageSetting.col}>
              {renderedCards}
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
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleCageClear={onCageClear}
          handleCageChange={onCageChange}
        />
      </Box>

    </Box>
  )
}

export default CageBoard