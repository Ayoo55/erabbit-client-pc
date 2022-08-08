<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选组件 -->
      <SubFilter></SubFilter>
    </div>
  </div>
</template>
<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './sub-filter.vue'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter
  }
}
</script>
<style scoped lang="less"></style>
