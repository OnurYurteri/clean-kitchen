import Order from '../types/Order'
import {
  filterOrdersByDate,
  groupByTimeSlot,
  getAvailability,
  fillEmptySlots,
} from './AvailabilityService'

const data: Order[] = [
  {
    date: '2021-11-29',
    time: 1030,
    orderId: '123',
    customerId: 'a-111',
  },
  {
    date: '2021-11-29',
    time: 1030,
    orderId: '223',
    customerId: 'a-211',
  },
  {
    date: '2021-11-29',
    time: 1230,
    orderId: '323',
    customerId: 'a-211',
  },
]

describe('Availability Service Tests', function () {
  it('should filter orders', function () {
    //Month starts from 0
    const dt = new Date(2021, 10, 29)
    const result = filterOrdersByDate(dt, data)
    expect(result.length).toEqual(3)
  })

  it('should filter orders with empty array', function () {
    //Month starts from 0
    const dt = new Date(2021, 0, 1)
    const result = filterOrdersByDate(dt, data)
    expect(result.length).toEqual(0)
  })

  it('should group by timeslot', function () {
    const result = groupByTimeSlot(data)
    expect(Object.keys(result).length).toEqual(2)
  })

  it('should return correct availability - 1', function () {
    const result = groupByTimeSlot(data)
    const availability = getAvailability(result, { max: 4 })
    availability.forEach((a) => expect(a.avaliable).toEqual(true))
  })
  it('should return correct availability - 2', function () {
    const result = groupByTimeSlot(data)
    const availability = getAvailability(result, { max: 2 })
    availability.forEach((a) => {
      expect(a.avaliable).toEqual(a.time !== 1030)
    })
  })

  it('should fill empty slots', function () {
    const result = groupByTimeSlot(data)
    const availability = getAvailability(result, { max: 2 })
    const final = fillEmptySlots(availability)

    let found = false
    final.forEach((a) => {
      if (a.time === 1830 && a.avaliable) {
        found = true
      }
    })
    expect(found).toEqual(true)
  })
})
