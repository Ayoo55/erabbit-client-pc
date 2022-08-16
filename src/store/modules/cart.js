
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
      return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
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
    }
  }
}
