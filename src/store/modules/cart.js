import { getNewCartGoods } from '@/api/cart'

// 购物车状态
export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  // 计算属性
  getters: {
    // 有效商品列表
    validList (state) {
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 商品总件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 商品总金额
    validAmount  (state, getters) {
      return getters.validList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
    },
    // 选中商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.validList.length !== 0 && getters.validList.length === getters.selectedList.length
    }
  },
  mutations: {
    // 加入购物车
    insertCart (state, payload) {
      // 查看购物车中是否有同一件商品
      // 有，则将商品数量累计到payload中，删除此商品信息
      // 无，则新增商品
      const sameIndex = state.list.findIndex(good => good.skuId === payload.skuId)
      if (sameIndex > -1) {
        payload.count += state.list[sameIndex].count
        state.list.splice(sameIndex, 1)
      }
      state.list.unshift(payload)
    },
    // 修改商品信息
    updateCart (state, goods) {
      // goods就是商品信息
      // 找到需要修改的商品对象
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      // 根据goods传入的字段来决定修改哪些字段，并且要判断传入的值是否有效
      for (const key in goods) {
        if (goods[key] !== undefined || goods[key] !== null || goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除商品信息
    deleteCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    }
  },
  actions: {
    // 区分已登录（异步）/未登录（同步）
    insertCart (context, payload) {
      return new Promise((resolve, reject) => {
        // context.rootState可以得到所有的state状态
        if (context.rootState.user.token) {
          // 已登录
        } else {
          // 未登录
          context.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 获取商品列表
    findCartList (context) {
      // 区分已登录（异步）/未登录（同步）
      return new Promise((resolve, reject) => {
        if (context.rootState.user.token) {
          // 已登录
        } else {
          // 未登录
          // promiseArr.all(promise数组)，同时发送请求
          const promiseArr = context.state.list.map(goods => {
            return getNewCartGoods(goods.skuId)
          })
          Promise.all(promiseArr).then(dataList => {
            dataList.forEach((data, index) => {
              context.commit('updateCart', { skuId: context.state.list[index].skuId, ...data.result })
            })
          })
          resolve()
        }
      })
    },
    // 删除购物车
    deleteCart (context, payload) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.token) {
          // 已登录状态
        } else {
          // 未登录状态
          // 单条商品删除
          context.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 修改购物车商品
    updateCart (context, goods) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
        } else {
          // 本地
          context.commit('updateCart', goods)
          resolve()
        }
      })
    },
    // 全选与取消全选
    checkAllCart (context, selected) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
        } else {
          // 本地
          // 拿到有效商品列表,遍历每一项有效商品，
          context.getters.validList.forEach(goods => {
            context.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 批量删除
    batchDeleteCart (context, isClear) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
        } else {
          context.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            context.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 修改sku规格函数
    updateCartSku (context, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
        } else {
          const oldGoods = context.state.list.find(item => item.skuId === oldSkuId)
          context.commit('deleteCart', oldSkuId)
          //  合并一条新的商品信息
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          context.commit('insertCart', newGoods)
        }
      })
    }

  }
}
