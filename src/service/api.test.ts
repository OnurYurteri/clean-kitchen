import { convertToOrders } from './api'

const data = [
  {
    date: '2021-11-29',
    time: '10:30',
    orderId: '123',
    customerId: 'a-111',
  },
  {
    date: '2021-11-29',
    time: '10:30',
    orderId: '223',
    customerId: 'a-211',
  },
  {
    date: '2021-11-29',
    time: '12:30',
    orderId: '323',
    customerId: 'a-211',
  },
  {
    date: '2021-11-29',
    time: '18:30',
    orderId: '423',
    customerId: 'a-411',
  },
]

describe('Api tests', function () {
  it('should convert any to orders', function () {
    const orders = convertToOrders(data)
    expect(orders[0].time).toEqual(1030)
    expect(orders[1].time).toEqual(1030)
    expect(orders[2].time).toEqual(1230)
    expect(orders[3].time).toEqual(1830)
  })
})
