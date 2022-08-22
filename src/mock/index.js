import Mock from 'mockjs'
import qs from 'qs'
Mock.setup({
  // 随机延迟
  timeout: '500-1000'
})

// 获取收藏
Mock.mock(/\/member\/collect/, 'get', config => {
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString)
  const items = []
  for (let i = 0; i < +queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      desc: '@ctitle(4,10)',
      price: '@float(100,200,2,2)',
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
    }))
  }

  return {
    msg: '获取数据成功',
    result: {
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      counts: 35,
      items

    }
  }
})

// 获取足迹
Mock.mock(/\/member\/browseHistory/, 'get', config => {
  console.log('a', config)
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString)
  const items = []
  for (let i = 0; i < +queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      desc: '@ctitle(4,10)',
      price: '@float(100,200,2,2)',
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
    }))
  }
  return {
    msg: '获取数据成功',
    result: {
      counts: 35,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items

    }
  }
})
