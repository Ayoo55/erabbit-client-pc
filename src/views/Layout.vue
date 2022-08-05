<template>
  <AppNavbar></AppNavbar>
  <AppHeader></AppHeader>
  <AppHeaderSticky></AppHeaderSticky>
  <div class="app-body">
    <!-- 左侧分类组件 -->
    <router-view ></router-view>
  </div>
  <AppFooter></AppFooter>
</template>
<script>
import AppNavbar from '../components/app-navbar.vue'
import AppHeader from '../components/app-header.vue'
import AppFooter from '../components/app-footer.vue'
import AppHeaderSticky from '../components/app-header-sticky.vue'
import { useStore } from 'vuex'
export default {
  name: 'LayoutVue',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped lang='less'>

</style>
