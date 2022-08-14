import { createRouter, createWebHashHistory } from 'vue-router'
import TopCategory from '@/views/category'
import SubCategory from '@/views/category/sub.vue'
import Goods from '@/views/goods/index.vue'
import Login from '@/views/login'
import LoginCallback from '@/views/login/callback.vue'
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
  // 路由重新渲染时调整页面位置到顶部
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

export default router
