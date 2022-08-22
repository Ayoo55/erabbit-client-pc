<template>
    <div class="member-home">
        <!-- 概览 -->
        <MemberHomeOverview></MemberHomeOverview>
        <!-- 收藏 -->
        <MemberHomePanel title="我的收藏"></MemberHomePanel>
        <!-- 足迹 -->
        <MemberHomePanel title="我的足迹"></MemberHomePanel>
        <!-- 猜你喜欢 -->
        <GoodsRelevant></GoodsRelevant>
    </div>
</template>
<script>
import MemberHomeOverview from './home-overview.vue'
import MemberHomePanel from './components/home-panel.vue'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
export default {
  name: 'MemberHome',
  components: { MemberHomeOverview, MemberHomePanel, GoodsRelevant }
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
}
</style>
