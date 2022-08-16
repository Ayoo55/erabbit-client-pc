import request from '@/utils/request'

// 获取新的商品信息（购物车更新）
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}
