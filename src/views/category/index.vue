<template>
  <div class="top-category">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/" >首页</XtxBreadItem>
        <XtxBreadItem :to="{path:'/category/1001'}">电器</XtxBreadItem>
        <XtxBreadItem >空调</XtxBreadItem>
      </XtxBread>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopCategory'
}
</script>
<style scoped lang="less"></style>
