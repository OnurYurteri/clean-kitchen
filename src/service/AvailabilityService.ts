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

const getAvailablityForDate = (date: Date): Availability[] => {
  const orders: Order[] = getOrders()
  const config = getConfig(date.getDay())

  const filtered = filterOrdersByDate(date, orders)
  const grouped = groupByTimeSlot(filtered)

  const result = getAvailability(grouped, config)

  return fillEmptySlots(result)
}

const filterOrdersByDate = (date: Date, orders: Order[]): Order[] => {
  const dateStr = toDateStr(date)
  return orders.filter((order) => order.date === dateStr)
}

const groupByTimeSlot = (orders: Order[]): OrdersByGroup => {
  return groupBy(orders, 'time')
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

  return timeSlots
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

export {
  getAvailablityForDate,
  filterOrdersByDate,
  groupByTimeSlot,
  getAvailability,
  fillEmptySlots,
}
