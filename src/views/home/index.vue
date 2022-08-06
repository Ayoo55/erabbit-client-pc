<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
      <!-- 新鲜好物 -->
      <HomeNew></HomeNew>
      <!-- 人气推荐 -->
      <HomeHot></HomeHot>
      <!-- 热门品牌 -->
      <HomeBrand></HomeBrand>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'

export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand
  }
}
</script>
<style scoped lang="less"></style>
