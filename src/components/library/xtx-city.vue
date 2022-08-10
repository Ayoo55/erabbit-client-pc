<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{active:visiable}">
        <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
        <span v-else class="value">{{fullLocation}}</span>
        <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visiable">
        <div v-if="loading" class="loading"></div>
        <template v-else>
        <span @click="changeCity(item)" class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
        </template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const visiable = ref(null)
    const loading = ref(false)
    const allcityData = ref([])
    const open = () => {
      loading.value = true
      visiable.value = true
      //   获取城市数据
      getCityData().then(data => {
        allcityData.value = data
        loading.value = false
      })
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const close = () => {
      visiable.value = false
    }
    // 切换展开收起
    const toggle = () => {
      visiable.value === true ? close() : open()
    }
    // 点击其他位置隐藏
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })

    // 当前地址列表
    const currList = computed(() => {
      // 省级
      let currList = allcityData.value
      //   根据记录的地址数据，选择进入哪一级列表
      //   市级
      if (changeResult.provinceCode) {
        currList = currList.find(item => item.code === changeResult.provinceCode).areaList
      }
      //   区级
      if (changeResult.cityCode) {
        currList = currList.find(item => item.code === changeResult.cityCode).areaList
      }
      return currList
    })

    // 记录选中的地址数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })

    // 点击地址记录地址，切换列表
    const changeCity = (item) => {
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        close()
        emit('change', changeResult)
      }
    }
    return { visiable, toggle, target, loading, currList, changeCity }
  }

}
// 获取城市数据
const getCityData = () => {
  // 返回promise
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      // 有本地缓存
      resolve(window.cityData)
    } else {
      // 没有本地缓存，调用接口获取数据
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        window.cityData = res.data
        resolve(res.data)
      })
    }
  })
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
        width: 130px;
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
        padding: 0 3px;
        &:hover {
            background: #f5f5f5;
        }
    }
    .loading {
        height: 290px;
        width: 100%;
        background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
