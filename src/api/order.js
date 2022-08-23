import request from '@/utils/request'

// 获取结算信息
export const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get')
}

// 添加收货地址信息
export const addAddress = (address) => {
  return request('/member/address', 'post', address)
}

// 修改收货地址信息
export const editAddress = (form) => {
  return request(`/member/address/${form.id}`, 'put', form)
}

// 提交订单
export const submitOrder = (params) => {
  return request('/member/order', 'post', params)
}

// 获取订单详情
export const findOrderDetail = (orderId) => {
  return request(`/member/order/${orderId}`, 'get')
}

// 获取我的所有订单
export const findOrderList = ({ page = 1, pageSize = 10, orderState = 0 }) => {
  return request('/member/order', 'get', { page, pageSize, orderState })
}

// 取消订单
export const cancelOrder = (orderId, cancelReason) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

// 确认收货
export const confirmOrder = (id) => {
  return request(`/member/order/${id}/receipt`, 'put', IDBDatabase)
}

// 删除订单
export const deleteOrder = (ids) => {
  return request('/member/order', 'delete', { ids })
}

// 查看物流
export const logisticsOrder = (id) => {
  return request(`/member/order/${id}/logistics`, 'get')
}
