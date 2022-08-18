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
