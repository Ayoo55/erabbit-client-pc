<template>
  <div>
    MemberOrder
    <XtxTabs v-model="activeName">
      <XtxTabsPanel label="选项1" name="first">内容1</XtxTabsPanel>
      <XtxTabsPanel label="选项2" name="second">内容2</XtxTabsPanel>

    </XtxTabs>

  </div>
</template>

<script>
import { ref } from 'vue'
export default {

  name: 'MemberOrder',
  setup () {
    const activeName = ref('second')
    return { activeName }
  }

}
</script>
