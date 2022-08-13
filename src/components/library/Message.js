// 实现使用函数调用xtx-message组件的逻辑

import { createVNode, render } from 'vue'
// 需要编译的组件
import XtxMessage from './xtx-message.vue'
// 装组件的容器,设置容器属性
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)
let timer = null
export default ({ type, text }) => {
  // 将组件编译成虚拟节点
  const vnode = createVNode(XtxMessage, { type, text })
  //   将虚拟节点渲染到容器中
  render(vnode, div)
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
