<template>
  <nav>顶部组件</nav>
  <header>头部组件</header>
  <div>
    中间组件
    <router-view ></router-view>
  </div>
  <footer>底部组件</footer>
</template>
<script>
export default {
  name: 'LayoutVue'
}
</script>

<style scoped lang='less'></style>
