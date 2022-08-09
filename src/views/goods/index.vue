<template>
  <div class='xtx-goods-page'>
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem v-if="goods" :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem v-if="goods" :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem v-if="goods" >{{goods.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info"></div>
      <!-- 商品推荐 -->
      <GoodsRelevant v-if="goods"/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import GoodsRelevant from './components/goods-relevant'
import { findGoods } from '@/api/product.js'
import { nextTick, ref, watch } from 'vue'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant },
  setup () {
    const goods = useGoods()
    console.log(goods)
    return { goods }
  }
}
// 获取商品信息函数
const useGoods = () => {
  // goods存储商品信息
  const goods = ref(null)
  const route = useRoute()
  //   监听路由中Id的改变
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 将 goods 中的数据置空，这样可以重新渲染组件
        goods.value = null
        // 等待 goods 置空后再赋值
        nextTick(() => {
          goods.value = data.result
        })
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
