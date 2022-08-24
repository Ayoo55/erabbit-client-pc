<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" @tab-click="tabClick" >
      <XtxTabsPanel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name"></XtxTabsPanel>
    </XtxTabs>

    <!-- 商品列表组件 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem
        @on-logistics="handlerLogistics"
        @on-submit="handlerSubmit"
        @on-delete="handlerDelete"
        @on-cancel="handlerCancel"
        v-for="item in orderList"
        :key="item.id"
        :order="item"
      />
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
    <!-- 物流组件 -->
    <OrderLogistics ref="orderLogisticsCom"></OrderLogistics>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import OrderItem from './components/order-item.vue'
import { findOrderList, confirmOrder, deleteOrder } from '@/api/order'
import OrderCancel from './components/order-cancel.vue'
import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'
import OrderLogistics from './components/order-logistics.vue'
export default {

  name: 'MemberOrder',
  components: { OrderItem, OrderCancel, OrderLogistics },
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
    const findOrderListFn = () => {
      loading.value = true
      findOrderList(reqParams).then(data => {
        orderList.value = data.result.items
        total.value = data.result.counts
        loading.value = false
      })
    }
    watch(reqParams, () => {
      findOrderListFn()
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

    // 删除订单
    const handlerDelete = (item) => {
      Confirm({ text: '您确认删除该条订单吗' }).then(() => {
        deleteOrder([item.id]).then(() => {
          Message({ text: '删除订单成功', type: 'success' })
          findOrderListFn()
        })
      })
    }

    const handlerSubmit = (item) => {
      Confirm({ text: '您要确定收货吗' }).then(() => {
        confirmOrder(item.id).then(() => {
          Message({ text: '确认收货成功', type: 'success' })
          // 确认收货后状态变成 待评价
          item.orderState = 4
        })
      })
    }

    return { activeName, orderStatus, orderList, tabClick, loading, reqParams, total, handlerCancel, orderCancelCom, handlerDelete, handlerSubmit, ...useLogistics() }
  }
}

// 查看物流
export const useLogistics = () => {
  const orderLogisticsCom = ref(null)
  const handlerLogistics = (item) => {
    orderLogisticsCom.value.open(item)
  }
  return { handlerLogistics, orderLogisticsCom }
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
