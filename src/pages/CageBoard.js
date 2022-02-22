import React, { useMemo, useState, useEffect } from 'react'
import { useTheme, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ControlMenu from '../components/CageBoard/ControlMenu'
import { CageCard, CageNullCard } from '../components/CageBoard/CageCard'
import AddIcon from '@mui/icons-material/Add'

const cageSetting = {
  col: 5,
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

  console.log(currentCage)

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


  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const totalCageAmount = useMemo(() => {
    return Array.from(new Array(cageSetting.col * cageSetting.row))
  }, [])

  const cageMapping = useMemo(() => {
    const cageMapping = {}
    cages.forEach(item => {
      cageMapping[item.serial] = item
    })
    return cageMapping
  }, [cages])

  const renderedCards = totalCageAmount.map((item, index) => {
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


  return (
    <Box
      sx={{
        pb: 4,
        bgcolor: '#efefef',
        minHeight: '100vh',
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="text.secondary" sx={{ pb: 2, pt: 1 }}>
            Cage Board
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <Button
              variant="contained"
              size="large"
              disableElevation
              startIcon={<AddIcon />}
              sx={{
                fontSize: '0.875rem',
                fontWeight: 'bold',
                letterSpacing: '0.1em',
                bgcolor: theme => alpha(theme.palette.primary.main, 0.6),
                '&:hover': {
                  bgcolor: theme => alpha(theme.palette.primary.main, 0.8),
                },
              }}
            >
              寵物進籠
            </Button>
          </Box>
        </Box>


        <Grid container spacing={3} columns={cageSetting.col}>
          {renderedCards}
        </Grid>

        <ControlMenu
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleCageClear={onCageClear}
        />
      </Box>

    </Box>
  )
}

export default CageBoard