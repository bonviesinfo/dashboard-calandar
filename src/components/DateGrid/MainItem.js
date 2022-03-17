import React from 'react'
import { useDrop } from 'react-dnd'

const MainItem = ({ children, className, ...restProps }) => {
  const gridIndex = restProps['data-index']
  const employeeId = restProps['data-id']


  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: () => ({ employeeId, gridIndex }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      // canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <div {...restProps} ref={drop} className={`${className} ${isOver ? 'active' : ''}`}>
      {children}
    </div>
  )
}

export default MainItem