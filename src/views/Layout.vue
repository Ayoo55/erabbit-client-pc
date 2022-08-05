<template>
  <AppNavbar></AppNavbar>
  <AppHeader></AppHeader>
  <div class="app-body">
    主体
    <router-view ></router-view>
  </div>
  <AppFooter></AppFooter>
</template>
<script>
import AppNavbar from '../components/app-navbar.vue'
import AppHeader from '../components/app-header.vue'
import AppFooter from '../components/app-footer.vue'
import { useStore } from 'vuex'
export default {
  name: 'LayoutVue',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped lang='less'>
.app-body{
  min-height: 600px;
}
</style>
