<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
// import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // const checked = ref(false)
    // const changeChecked = () => {
    //   checked.value = !checked.value
    //   emit('update:modelValue', checked.value)
    // }
    // watch(() => props.modelValue, (newValue) => {
    //   checked.value = props.modelValue
    // }, { immediate: true })
    // return { checked, changeChecked }

    // useVModel 方法，可以实现双向数据绑定 v-model 指令
    // 1.props 接收默认的 modelValue
    // 2. useVModel 来包装props 中的 modelValue 属性
    // 3. checked.value 就是使用父组件的数据
    // 4.如果要调用父组件的其他事件，可以使用 emit()方法，两个参数分别为事件名，与传入的值
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newVal = !checked.value
      checked.value = newVal
      emit('change', newVal)
    }
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
