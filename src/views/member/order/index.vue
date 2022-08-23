<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" >
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name"></XtxTabsPanel>
    </XtxTabs>

    <!-- 商品列表组件 -->
    <OrderItem v-for="goods in orderList " :key="goods.id" :order="goods"></OrderItem>

  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { orderStatus } from '@/api/constants'
import OrderItem from './components/order-item.vue'
import { findOrderList } from '@/api/order'
export default {

  name: 'MemberOrder',
  components: { OrderItem },
  setup () {
    const activeName = ref('all')
    const orderList = ref([])
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      orderState: 0
    })
    findOrderList(reqParams).then(data => {
      orderList.value = data.result.items
      console.log(orderList)
    })
    return { activeName, orderStatus, orderList }
  }

}
</script>

<style lang="less" scoped>
.member-order-page{
  height: 100%;
  background-color: #fff;
}
</style>
