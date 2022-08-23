<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" @tab-click="tabClick" >
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name"></XtxTabsPanel>
    </XtxTabs>

    <!-- 商品列表组件 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem  @on-cancel="handlerCancel" v-for="item in orderList" :key="item.id" :order="item" />
    </div>

    <!-- 分页组件 -->
    <XtxPagination
      v-if="total > reqParams.pageSize"
      :currentPage="reqParams.page"
      :page-size="reqParams.pageSize"
      @current-change="reqParams.page=$event"
      :total="total"
    ></XtxPagination>
    <!-- 取消原因组件 -->
    <OrderCancel ref="orderCancelCom"></OrderCancel>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import OrderItem from './components/order-item.vue'
import { findOrderList } from '@/api/order'
import OrderCancel from './components/order-cancel.vue'

export default {

  name: 'MemberOrder',
  components: { OrderItem, OrderCancel },
  setup () {
    const activeName = ref('all')
    const orderList = ref([])

    // 接口参数
    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })

    const loading = ref(false)
    const total = ref(null)

    // 监听reqParams数据改变
    watch(reqParams, () => {
      loading.value = true
      findOrderList(reqParams).then(data => {
        orderList.value = data.result.items
        total.value = data.result.counts
        loading.value = false
      })
    }, { immediate: true })

    // 点击选项卡
    const tabClick = (tab) => {
      reqParams.orderState = tab.index
      reqParams.page = 1
    }

    // 取消订单
    const orderCancelCom = ref(null)
    const handlerCancel = (item) => {
      orderCancelCom.value.open(item)
    }

    return { activeName, orderStatus, orderList, tabClick, loading, reqParams, total, handlerCancel, orderCancelCom }
  }

}
</script>

<style lang="less" scoped>
.member-order-page{
  height: 100%;
  background-color: #fff;
}
.order-list {
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
