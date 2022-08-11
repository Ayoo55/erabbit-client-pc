<template>
  <div class="goods-hot">
    <h3>{{title}} </h3>
    <div>
        <GoodsItem v-for="item in  goodsList" :key="item.id" :goods="item"></GoodsItem>
    </div>

  </div>
</template>

<script>
import { computed, ref } from 'vue'
import GoodsItem from '../../category/components/goods-item'
import { findHotGoods } from '@/api/product'
import { useRoute } from 'vue-router'
export default {

  name: 'GoodsHot',
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  components: {
    GoodsItem
  },
  setup (props) {
    // 标题
    const tilteObj = { 1: '24小时热榜', 2: '周热榜', 3: '总热榜' }
    const title = computed(() => {
      return tilteObj[props.type]
    })
    // 商品列表
    const route = useRoute()
    const goodsList = ref([])
    findHotGoods({ id: route.params.id, type: props.type }).then(data => {
      goodsList.value = data.result
    })
    return { title, goodsList }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}</style>
