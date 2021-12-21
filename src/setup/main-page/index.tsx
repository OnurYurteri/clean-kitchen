import './MainPage.css'
import DatePicker from '../../component/date-picker/'
import { useState } from 'react'
import SlotSelector from '../../component/slot-selector'
import { getAvailablityForDate } from '../../service/AvailabilityService'
import Availability from '../../types/Availability'
import { dateFromStr, nowDateStr } from '../../util'

function MainPage() {
  const [date, setDate] = useState(nowDateStr)
  const [availability, setAvailability] = useState<Availability[]>(
    (): Availability[] => {
      return getAvailablityForDate(dateFromStr(date))
    }
  )

  const refreshAvailability = (date: Date) => {
    const res = getAvailablityForDate(date)
    setAvailability(res)
  }

  const changed = (value: string) => {
    setDate(value)
    refreshAvailability(dateFromStr(value))
  }

  return (
    <div className="App">
      <header className="App-header">
        <DatePicker
          style={{ height: '2.5rem', margin: '15px' }}
          onChange={changed}
          value={date}
        ></DatePicker>
        {date ? (
          <SlotSelector availability={availability}></SlotSelector>
        ) : null}
      </header>
    </div>
  )
}

export default MainPage
