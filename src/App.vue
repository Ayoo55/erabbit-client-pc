<template>
  <div>{{$store.state.user.profile}}</div>
  <button @click="fn">测试请求</button>
</template>
<script>
import request from './utils/request'
export default {
  setup () {
    const fn = () => {
      request('/member/profile', 'get')
    }

    return { fn }
  }
}
</script>
