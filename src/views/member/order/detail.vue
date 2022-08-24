<template>
   <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <OrderDetailAction />
    <!-- 步骤条-->
    <DetailStep :order="order"></DetailStep>
    <!-- 物流栏 -->
    <Suspense>
      <template #default >
        <DetailLogistics v-if="[3,4,5].includes(order.orderState)" :order="order"></DetailLogistics>
      </template>
      <template #fallback>
        <div class="loading">...loading</div>
      </template>
    </Suspense>
    <!-- 订单商品信息 -->
  </div>
</template>

<script>
import OrderDetailAction from './components/detail-action.vue'
import DetailStep from './components/detail-step.vue'
import DetailLogistics from './components/detail-logistics.vue'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {

  name: 'MemberOrderDetail',
  components: { OrderDetailAction, DetailStep, DetailLogistics },
  setup () {
    const order = ref(null)
    const route = useRoute()
    findOrderDetail(route.params.id).then(data => {
      order.value = data.result
    })
    return { order }
  }

}
</script>
<style lang="less" scoped>
.loading{
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
}
</style>
