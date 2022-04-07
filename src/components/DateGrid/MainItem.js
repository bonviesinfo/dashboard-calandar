import React from 'react'
import { useDrop } from 'react-dnd'
import { locateEvent } from '../../utils/timeUtils'
// import IconButton from '@mui/material/IconButton'
// import AddIcon from '@mui/icons-material/Add'
// import {
//   timePerHour,
//   intervalMinute,
// } from '../../constants/dateGrid'

const MainItem = ({
  children,
  className,
  selectDateMs,
  employeesOccupiedTime,
  ...restProps
}) => {
  const gridIndex = restProps['data-index']
  const employeeId = restProps['data-id']

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: () => ({ employeeId, gridIndex }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item, monitor) => {
      const eventId = item.id
      if (!eventId) return false
      const { eventLength } = locateEvent(item, selectDateMs)

      const occupiedTime = employeesOccupiedTime[employeeId]
      if (occupiedTime) {
        for (let i = gridIndex; i < (gridIndex + eventLength); i += 1) {
          if (occupiedTime[i] && occupiedTime[i] !== eventId) {
            return false
          }
        }
      }

      return true
    },
  }), [employeesOccupiedTime])

  let bgClassName = ''
  if (isOver && !canDrop) {
    bgClassName = ' blocked'
  } else if (isOver) {
    bgClassName = ' active'
  }

  return (
    <div {...restProps} ref={drop} className={`${className}${bgClassName}`}>
      {/* <IconButton>
        <AddIcon />
      </IconButton> */}
      {children}
    </div>
  )
}

export default MainItem