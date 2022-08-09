<template>
  <div class="goods-image">
    <!-- 放大图 -->
    <div v-show="show" class="large" :style="[{backgroundImage:`url(${images[currIndex]})`},largePosition]"></div>
    <!-- 中图 -->
    <div class="middle" ref="target" >
      <img :src="images[currIndex]"  alt="" />
      <div v-show="show" :style="layerPosition" class="layer"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li v-for="(item,i) in images" :key="i" :class="{active:i===currIndex}">
        <img @mouseenter="currIndex=i" :src="item" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const currIndex = ref(0)
    const show = ref(false)
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    // 遮罩层坐标（样式）
    const layerPosition = reactive({
      top: 0,
      left: 0
    })
    // 大图背景定位
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })
    watch([elementX, elementY, isOutside], () => {
      show.value = !isOutside.value
      const position = { x: 0, y: 0 }
      if (elementX.value < 100) {
        position.x = 0
      } else if (elementX.value > 300) {
        position.x = 200
      } else {
        position.x = elementX.value - 100
      }
      if (elementY.value < 100) {
        position.y = 0
      } else if (elementY.value > 300) {
        position.y = 200
      } else {
        position.y = elementY.value - 100
      }
      //   大背景的定位
      largePosition.backgroundPositionY = -position.x * 2 + 'px'
      largePosition.backgroundPositionX = -position.y * 2 + 'px'
      //   遮罩层的定位
      layerPosition.top = position.y + 'px'
      layerPosition.left = position.x + 'px'
    })

    return { currIndex, target, show, largePosition, layerPosition }
  }
}
</script>
<style scoped lang="less">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;
    z-index: 500;
    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        background-repeat: no-repeat;
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }
    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
         position: relative;
        cursor: move;
        .layer {
            width: 200px;
            height: 200px;
            background: rgba(0,0,0,.2);
            left: 0;
            top: 0;
            position: absolute;
        }
    }
    .small {
        width: 80px;
        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;
            &:hover,&.active {
            border: 2px solid @xtxColor;
            }
        }
    }
}
</style>
