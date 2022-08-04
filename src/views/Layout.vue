<template>
  <AppNavbar></AppNavbar>
  <AppHeader></AppHeader>
  <div class="app-body">
    中间组件
    <router-view ></router-view>
  </div>
  <AppFooter></AppFooter>
</template>
<script>
import AppNavbar from '../components/app-navbar.vue'
import AppHeader from '../components/app-header.vue'
import AppFooter from '../components/app-footer.vue'
export default {
  name: 'LayoutVue',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter
  }
}
</script>

<style scoped lang='less'>
.app-body{
  min-height: 600px;
}
</style>
