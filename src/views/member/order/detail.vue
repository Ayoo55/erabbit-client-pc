<template>
   <div class="order-detail-page">
    <!-- 操作栏 -->
    <OrderDetailAction />
    <!-- 步骤条-->
    <!-- 物流栏 -->
    <!-- 订单商品信息 -->
  </div>
</template>

<script>
import OrderDetailAction from './components/detail-action.vue'
export default {

  name: 'MemberOrderDetail',
  components: { OrderDetailAction }

}
</script>
