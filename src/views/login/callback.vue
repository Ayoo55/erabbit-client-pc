<template>
  <div class="login-callback">
    <LoginHeader>联合登录</LoginHeader>
    <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
    </section>

    <section class="container" v-else>
      <nav class="tab">
        <a @click="hasAccount=true" :class="{active:hasAccount}" href="javascript:;">
          <i class="iconfont icon-bind" />
          <span>已有小兔鲜账号，请绑定手机</span>
        </a>
        <a @click="hasAccount=false" :class="{active:!hasAccount}" href="javascript:;">
          <i class="iconfont icon-edit" />
          <span>没有小兔鲜账号，请完善资料</span>
        </a>
      </nav>
      <div class="tab-content" v-if="hasAccount">
        <CallbackBind :unionId="unionId" />
      </div>
      <div class="tab-content" v-else>
        <CallbackPatch :unionId="unionId"/>
      </div>
    </section>
    <LoginFooter></LoginFooter>
  </div>
</template>

<script>
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import CallbackBind from './components/callback-bind'
import CallbackPatch from './components/callback-patch'
import { ref } from 'vue'
import QC from 'qc'
import { userQQLogin } from '@/api/user'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
export default {

  name: 'LoginCallback',
  components: {
    LoginHeader, LoginFooter, CallbackBind, CallbackPatch
  },
  setup () {
    const hasAccount = ref(false)
    const isBind = ref(true)
    const store = useStore()
    const router = useRouter()
    const unionId = ref(null)
    if (QC.Login.check()) {
      QC.Login.getMe((openId) => {
        unionId.value = openId
        userQQLogin(openId).then(data => {
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          store.dispatch('cart/mergeLocalCart').then(() => {
            router.push(store.state.user.redirectUrl)
            Message({ type: 'success', text: 'QQ登录成功' })
          })
        }).catch(e => {
          isBind.value = false
        })
      })
    }
    return { hasAccount, isBind, unionId }
  }

}
</script>
<style scoped lang='less'>
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
