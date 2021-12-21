import Order from '../types/Order'
import Availability from '../types/Availability'
import { getOrders } from './api'
import { groupBy, toDateStr } from '../util'
import TimeSlots from '../constant/TimeSlots'
import { getConfig } from '../constant/AvailabilityConfig'
import DayConfig from '../types/DayConfig'

interface OrdersByGroup {
  [key: string]: Order[]
}

const groupOrdersByDateAndTime = (
  date: Date,
  orders: Order[]
): OrdersByGroup => {
  const ordersByDate = groupBy(orders, 'date')
  const dateStr = toDateStr(date)
  const ordersForDay = ordersByDate[dateStr] || []
  return groupBy(ordersForDay, 'time')
}

const getAvailability = (
  map: OrdersByGroup,
  config: DayConfig
): Availability[] => {
  const timeSlots: Availability[] = Object.keys(map).map((time) => {
    return {
      time: parseInt(time),
      avaliable: map[time].length < config.max,
    }
  })

  return fillEmptySlots(timeSlots)
}

const getAvailablityForDate = (date: Date): Availability[] => {
  const orders: Order[] = getOrders()
  const config = getConfig(date.getDay())

  const map = groupOrdersByDateAndTime(date, orders)

  const result = getAvailability(map, config)

  return result
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

export { getAvailablityForDate, groupOrdersByDateAndTime, getAvailability }
