<template>
   <div class="order-detail-page">
    <!-- 操作栏 -->
    <OrderDetailAction />
    <!-- 步骤条-->
    <DetailStep :order="order"></DetailStep>
    <!-- 物流栏 -->
    <!-- 订单商品信息 -->
  </div>
</template>

<script>
import OrderDetailAction from './components/detail-action.vue'
import DetailStep from './components/detail-step.vue'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
export default {

  name: 'MemberOrderDetail',
  components: { OrderDetailAction, DetailStep },
  setup () {
    const order = ref(null)
    const route = useRoute()
    findOrderDetail(route.params.id).then(data => {
      order.value = data.result
      console.log(order.value)
    })
    return { order }
  }

}
</script>
