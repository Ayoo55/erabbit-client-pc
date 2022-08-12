<template>
  <div class="xtx-pagination">
    <a @click="changePager(myCurrentPage-1)" v-if="myCurrentPage>1" href="javascript:;">上一页</a>
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start>1">...</span>
    <a @click="changePager(i)" v-for="i in pager.btnArr" :key="i" href="javascript:;" :class="{active:myCurrentPage===i}">{{i}}</a>
    <span v-if="pager.end<pager.pageCount">...</span>
    <a @click="changePager(myCurrentPage+1)" v-if="myCurrentPage<pager.pageCount" href="javascript:;">下一页</a>
    <a v-else href="javascript:;" class="disabled">下一页</a>

  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
export default {
  name: 'XtxPagination',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  setup (props, { emit }) {
    // 1.约定按钮个数
    const count = 5
    // 2.显示页码
    const myCurrentPage = ref(1)
    // 3.总页数
    const myTotal = ref(100)
    const myPageSize = ref(5)
    const pager = computed(() => {
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      const offset = Math.floor(count / 2)
      let start = myCurrentPage.value - offset
      let end = start + count - 1
      if (start < 1) {
        start = 1
        end = (start + count - 1) > pageCount ? pageCount : start + count - 1
      }
      if (end > pageCount) {
        end = pageCount
        start = end - count + 1
      }
      //   按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }
      return {
        myTotal, myPageSize, pageCount, start, end, btnArr
      }
    })
    // 改变页码
    const changePager = (newPage) => {
      myCurrentPage.value = newPage
      emit('current-change', newPage)
    }
    watch(props, () => {
      myTotal.value = props.total
      myCurrentPage.value = props.currentPage
      myPageSize.value = props.pageSize
    }, { immediate: true })

    return { count, pager, myCurrentPage, changePager }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
