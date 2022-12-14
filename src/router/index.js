import { createRouter, createWebHashHistory } from 'vue-router'
import TopCategory from '@/views/category'
import SubCategory from '@/views/category/sub.vue'
import Goods from '@/views/goods/index.vue'
import Login from '@/views/login'
import LoginCallback from '@/views/login/callback.vue'
import XtxCartPage from '@/views/cart/index.vue'
import XtxPayCheckoutPage from '@/views/member/pay/checkout.vue'
import XtxPayPage from '@/views/member/pay/index.vue'
import XtxPayResultPage from '@/views/member/pay/result.vue'
import MemberLayout from '@/views/member/Layout.vue'
import MemberHome from '@/views/member/home'
import MemberOrder from '@/views/member/order'
import MemberOrderDetail from '@/views/member/order/detail.vue'
import store from '@/store'
import { h } from 'vue'
// import { h } from 'vue'
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/home')
      },
      {
        path: '/category/:id',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
      },
      {
        path: '/product/:id',
        component: Goods
      },
      {
        path: '/cart',
        component: XtxCartPage
      },
      {
        path: '/member/checkout',
        component: XtxPayCheckoutPage
      },
      {
        path: '/member/pay',
        component: XtxPayPage
      },
      {
        path: '/pay/callback',
        component: XtxPayResultPage
      },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome },
          {
            path: '/member/order',
            component: { render: () => h(<RouterView />) },
            children: [
              { path: '', component: MemberOrder },
              { path: ':id', component: MemberOrderDetail }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/login/callback',
    component: LoginCallback
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // ????????????????????????????????????????????????
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

// ??????????????????
// ????????????????????????????????????????????? /member ??????
router.beforeEach((to, from, next) => {
  // ????????????
  const { token } = store.state.user.profile
  // ?????????member??????????????????????????????
  if (to.path.startsWith('/member') && !token) {
    next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})
export default router
