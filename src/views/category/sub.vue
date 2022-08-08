<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选组件 -->
      <SubFilter></SubFilter>
      <!-- 复选框 -->
      <XtxCheckbox v-model="modelValue">全选{{modelValue}}</XtxCheckbox>
    </div>
  </div>
</template>
<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './sub-filter.vue'
import { ref } from 'vue'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter
  },
  setup () {
    const modelValue = ref(true)
    return { modelValue }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
