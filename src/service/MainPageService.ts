import Order from '../types/Order'
import Availability from '../types/Availability'
import { getOrders } from './api'
import { groupBy, toDateStr } from '../util'
import TimeSlots from '../types/TimeSlots'

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const availablityConfig = {
  MON: {
    max: 4,
  },
  TUE: {
    max: 2,
  },
  WED: {
    max: 2,
  },
  THU: {
    max: 2,
  },
  FRI: {
    max: 2,
  },
  SAT: {
    max: 2,
  },
  SUN: {
    max: 2,
  },
}

const getAvailablityForDate = (date: Date): Availability[] => {
  const orders: Order[] = getOrders()
  const config = availablityConfig[days[date.getDay()]]

  const ordersByDate = groupBy(orders, 'date')
  const dateStr = toDateStr(date)
  const ordersForDay = ordersByDate[dateStr] || []

  const dayOrdersByTime = groupBy(ordersForDay, 'time')

  const timeSlots: Availability[] = Object.keys(dayOrdersByTime).map((time) => {
    const timeSlot = {
      time: parseInt(time),
      avaliable: dayOrdersByTime[time].length < config.max,
    }

    return timeSlot
  })

  return fillEmptySlots(timeSlots)
}

const fillEmptySlots = (timeSlots: Availability[]): Availability[] => {
  const filledTimeSlots: Availability[] = []

  Object.keys(TimeSlots).forEach((time) => {
    const timeNumber = parseInt(time)
    const timeSlot = timeSlots.find((timeSlot) => timeSlot.time === timeNumber)
    if (timeSlot) {
      filledTimeSlots.push(timeSlot)
    } else {
      filledTimeSlots.push({
        time: timeNumber,
        avaliable: true,
      })
    }
  })

  return filledTimeSlots
}

export { getAvailablityForDate }
