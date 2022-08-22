<template>
    <div class="member-home">
        <!-- 概览 -->
        <MemberHomeOverview></MemberHomeOverview>
        <!-- 收藏 -->
        <MemberHomePanel title="我的收藏">
            <GoodsItem v-for="item in goods" :key="item.id" :goods="item" ></GoodsItem>
        </MemberHomePanel>
        <!-- 足迹 -->
        <MemberHomePanel title="我的足迹">
            <GoodsItem v-for="item in footprint" :key="item.id" :goods="item" ></GoodsItem>
        </MemberHomePanel>
        <!-- 猜你喜欢 -->
        <GoodsRelevant></GoodsRelevant>
    </div>
</template>
<script>
import MemberHomeOverview from './home-overview.vue'
import MemberHomePanel from './components/home-panel.vue'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
import GoodsItem from '@/views/category/components/goods-item'
import { findCollect, findFootprint } from '@/api/member'
import { ref } from 'vue'
export default {
  name: 'MemberHome',
  components: { MemberHomeOverview, MemberHomePanel, GoodsRelevant, GoodsItem },
  setup () {
    // const goods = {
    //   id: '1',
    //   name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
    //   picture: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
    //   desc: '清汤鲜香 红汤劲爽',
    //   price: '159.00'
    // }

    // 获取收藏
    const goods = ref([])
    findCollect({ page: 1, pageSize: 4 }).then(data => {
      console.log(data)
      goods.value = data.result.items
    })

    // 获取足迹
    const footprint = ref([])
    findFootprint({ page: 1, pageSize: 4 }).then(data => {
      footprint.value = data.result.items
    })
    return { goods, footprint }
  }
}
</script>
<style scoped lang="less">
.member-home {
    :deep(.xtx-carousel) .carousel-btn.prev {
        left: 5px;
    }
    :deep(.xtx-carousel) .carousel-btn.next {
        right: 5px;
    }
    :deep(.goods-list) {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }
}
</style>
