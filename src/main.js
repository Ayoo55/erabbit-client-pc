import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ui from './components/library'

import './mock'

// 重置样式的库
import 'normalize.css'
// 自己的样式库
import '@/assets/styles/common.less'

createApp(App).use(store).use(router).use(ui).mount('#app')
