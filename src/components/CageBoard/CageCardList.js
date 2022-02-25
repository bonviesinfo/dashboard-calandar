import React, { memo } from 'react'
import { CageCard, CageNullCard } from './CageCard'

const CageCardList = ({
  cageSetting,
  handleClick,
  handleNullClick,
  cageMapping,
  totalCageArray,
}) => {

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
          handleNullClick={handleNullClick}
        />
      )
  })

  return (
    renderedCards
  )
}

export default memo(CageCardList)