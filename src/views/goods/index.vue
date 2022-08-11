<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
        <XtxBread>
            <XtxBreadItem to="/">首页</XtxBreadItem>
            <XtxBreadItem  :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}}</XtxBreadItem>
            <XtxBreadItem  :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}}</XtxBreadItem>
            <XtxBreadItem  >{{goods.name}}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
            <div class="media">
                <GoodsImage :images="goods.mainPictures"></GoodsImage>
                <GoodsSales></GoodsSales>
            </div>
            <div class="spec">
                <GoodsName :goods="goods"></GoodsName>
                <!-- 规格组件 -->
                <GoodsSku @change="changeSku" skuId="1563028" :goods="goods"/>
            </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant/>
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
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku.vue'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku },
  setup () {
    const goods = useGoods()
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    return { goods, changeSku }
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
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
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
