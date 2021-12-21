import './DatePicker.css'
import { useEffect, useRef } from 'react'
import { nowDateStr } from '../../util'

interface Props {
  style?: React.CSSProperties
  onChange?: (value: string) => void
  value?: string
}

function DatePicker({ style, onChange, value }: Props) {
  const input = useRef<HTMLInputElement | null>(null)

  const changed = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value)
  }

  useEffect(() => {
    if (input.current) {
      input.current.value = value || nowDateStr()
    }
  }, [value])

  return (
    <div>
      <label>Choose a date </label>
      <br></br>
      <input
        ref={input}
        type="date"
        name="date"
        style={style}
        onChange={changed}
      ></input>
    </div>
  )
}

export default DatePicker
