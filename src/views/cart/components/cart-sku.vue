<template>
  <div ref="target" class="cart-sku" >
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <GoodsSku @change="changeSku" v-if="goods" :skuId="skuId" :goods="goods" />
        <XtxButton @click="submit" v-if="goods" type="primary" size="mini" style="margin-left:60px">确认</XtxButton>
      </template>
    </div>
  </div>
</template>
<script>
import { getSpecsAndSkus } from '@/api/cart'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import GoodsSku from '@/views/goods/components/goods-sku.vue'
import XtxButton from '@/components/library/xtx-button.vue'
export default {
  name: 'CartSku',
  components: { GoodsSku, XtxButton },
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const visible = ref(false)
    const loading = ref(false)
    const goods = ref(null)
    const open = () => {
      loading.value = true
      getSpecsAndSkus(props.skuId).then(data => {
        loading.value = false
        goods.value = data.result
      })
      visible.value = true
    }
    const close = () => {
      visible.value = false
    }
    const toggle = () => {
      visible.value ? close() : open()
    }
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })
    // 更改选中商品信息时，会触发change事件， goods-sku 会监听改变的数据并传给父组件，则可以获取到 currSku
    const currSku = ref(null)
    const changeSku = (sku) => {
      // 得到修改后的商品信息
      currSku.value = sku
    }
    // 点击确定,判断当前的 currsku是否存在并且与之前的sku并不相同
    const submit = () => {
      if (currSku.value && currSku.value.skuId && currSku.value.skuId !== props.skuId) {
        // 将修改后的数据传给父组件，index.vue
        emit('change', currSku.value)
        close()
      }
    }

    return { visible, toggle, target, goods, loading, changeSku, submit }
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
