import { useState } from 'react'
import Availablity from '../../types/Availability'
import TimeSlots from '../../types/TimeSlots'
import './Slot.css'

interface Props {
  onChange?: (value: number) => void
  children: Availablity
}

export default function Slot({ children, onChange }: Props) {
  const name = TimeSlots[children.time]

  const [selected, setSelected] = useState(false)

  const getClassNames = (isSelected, isDisabled) => {
    if (isDisabled) {
      return 'disabled'
    }
    if (isSelected) {
      return 'selected'
    }
  }

  const handleClick = (e) => {
    if (selected) {
      setSelected(false)
    } else {
      setSelected(true)
    }
    if (children.avaliable) {
      onChange && onChange(children.time)
    }
  }

  return (
    <button
      className={getClassNames(selected, !children.avaliable)}
      disabled={!children.avaliable}
      onClick={handleClick}
    >
      {name}
    </button>
  )
}
