import React, { memo, useEffect } from 'react'
import reactDom from 'react-dom'
import { useDrag, useDrop } from 'react-dnd'

const dustbinStyle = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

const boxStyle = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}

export const Box = function Box({ name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BOX',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  return (<div ref={drag} role="Box" style={{ ...boxStyle, opacity }} data-testid={`box-${name}`}>
    {name}
  </div>)
}

export const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'BOX',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  }
  else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  return (<div ref={drop} role={'Dustbin'} style={{ ...dustbinStyle, backgroundColor }}>
    {isActive ? 'Release to drop' : 'Drag a box here'}
  </div>)
}

const DnDTest = memo(function DnDTest() {
  // useEffect(() => {
  //   console.log('DnDTest')
  //   const boxesContainer = document.querySelector('.boxes-container')

  //   console.log(boxesContainer)

  //   boxesContainer && console.log('OK')
  //   reactDom.createPortal('123', boxesContainer)
  // })

  const showPortal = () => {
    const boxesContainer = document.querySelector('.boxes-container')

    console.log(boxesContainer)

    boxesContainer && reactDom.createPortal('123', boxesContainer)
  }


  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Dustbin />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Box name="Glass" />
        <Box name="Banana" />
        <Box name="Paper" />
      </div>
      <div className="boxes-container" style={{ overflow: 'hidden', clear: 'both' }}>
        {showPortal()}
      </div>
    </div>
  )
})


export default DnDTest