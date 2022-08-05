<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />

      <XtxMore path="/test"></XtxMore>
      <HomePanel title="hao" subTitle="hen">
        <template #right>
          <XtxMore path="/"></XtxMore>
        </template>
      </HomePanel>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomePanel from './components/home-panel.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomePanel
  }
}
</script>
<style scoped lang="less"></style>
