<template>
  <div v-show="activeName === name" class="xtx-tabs-panel">
    <slot></slot>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {

  name: 'XtxTabsPanel',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    }
  },
  setup () {
    const activeName = inject('activeName')
    return { activeName }
  }

}
</script>
