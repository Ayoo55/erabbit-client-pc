// 分类模块
import { findAllCategory } from '@/api/category'
import { topCategory } from '@/api/constants'
export default {
  namespaced: true,
  state () {
    return {
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setList (state, payload) {
      state.list = payload
    },
    // 显示方法
    show (state, item) {
      // 遍历所有列表，找到当前选中的分类
      const category = state.list.find(category => category.id === item.id)
      // 设置当前选中分类的二级为显示状态
      category.open = true
    },
    // 隐藏方法
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }

  },
  actions: {
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      // 遍历头部分类，为每一项分类添加open属性，控制二级分类的显示隐藏
      result.forEach(item => {
        item.open = false
      })
      commit('setList', result)
    }
  }
}
