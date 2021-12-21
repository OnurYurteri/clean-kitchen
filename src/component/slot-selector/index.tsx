import React from 'react'
import Availability from '../../types/Availability'
import Slot from './Slot'

interface Props {
  availability: Availability[]
  onChange?: (value: String) => void
}

function SlotSelector({ availability }: Props) {
  return (
    <div>
      {availability.map((a, index) => {
        return <Slot key={index}>{a}</Slot>
      })}
    </div>
  )
}

export default SlotSelector
