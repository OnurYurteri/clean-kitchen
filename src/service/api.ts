import orders from './data/sample-orders.json'
import Order from '../types/Order'

const getOrders = (): Order[] => {
  return convertToOrders(orders)
}

const convertToOrders = (jsonList: any[]): Order[] => {
  return jsonList.map((json: any) => {
    return {
      date: json.date,
      time: parseInt(json.time.replace(':', '')),
      orderId: json.orderId,
      customerId: json.customerId,
    }
  })
}

export { getOrders, convertToOrders }
