import { createVNode, render } from 'vue'
import XtxConfirm from './xtx-confirm.vue'

const div = document.createElement('div')
div.setAttribute('class', 'xtx-comfirm-container')
document.body.appendChild(div)

export default ({ title, text }) => {
  return new Promise((resolve, reject) => {
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }
    const submitCallback = () => {
      render(null, div)
      resolve()
    }
    const vnode = createVNode(XtxConfirm, { title, text, cancelCallback, submitCallback })
    render(vnode, div)
  })
}
