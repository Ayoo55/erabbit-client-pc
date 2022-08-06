import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export const useLazyData = (target, apiFn) => {
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        apiFn().then(data => {
          result.value = data.result
        })
      }
    }
  )
  return result
}
