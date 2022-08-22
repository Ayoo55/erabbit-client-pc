import request from '@/utils/request'

// 获取收藏分页数据
export const findCollect = ({ page = 1, pageSize = 10, collectType = 1 }) => {
  return request('/member/collect', 'get', { page, pageSize, collectType })
}

// 获取足迹
export const findFootprint = ({ page = 1, pageSize = 1 }) => {
  return request('/member/browseHistory', 'get', { page, pageSize })
}
