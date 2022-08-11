<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
            <img :class="{selected:val.selected,disabled:val.disabled}" @click="changeSku(item,val)" v-if="val.picture" :src="val.picture" :title="val.name">
            <span :class="{selected:val.selected,disabled:val.disabled}" @click="changeSku(item,val)"  v-else>{{val.name}}</span>
        </template>
      </dd>
    </dl>

  </div>
</template>
<script>
import getPowerSet from '@/vender/power-set'
const spliter = '★'
// 获取路径字典
const getPathMap = (skus) => {
  // 1.获取所有skus,从props传入
  // 2.得到所有有效的sku,遍历skus
  const pathMap = {}
  skus.forEach(sku => {
    if (sku.inventory) {
      // 3.重新整理 sku 中的 有效值——valueName
      const specs = sku.specs.map(spec => spec.valueName)
      //   4.得到sku属性值数组的子集
      const powerSet = getPowerSet(specs)
      //   5.遍历子集数组，生成对象的键
      powerSet.forEach(set => {
        // 6.因为数组中可能有多个数据，利用join拼接成字符串，从而作为对象的键
        const key = set.join(spliter)
        // 如果对象中有这个键，则追加值
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
// 获取禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((item, i) => {
    const selectedValues = getSelectedArr(specs)
    item.values.forEach(val => {
      if (val.selected) return
      selectedValues[i] = val.name
      const key = selectedValues.filter(value => value).join(spliter)
      val.disabled = !pathMap[key]
    })
  })
}
// 获取选中按钮
const getSelectedArr = (specs) => {
  const arr = []
  specs.forEach(item => {
    const selectedVal = item.values.find(val => val.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const pathMap = getPathMap(props.goods.skus)
    updateDisabledStatus(props.goods.specs, pathMap)
    const changeSku = (item, val) => {
      if (val.disabled) {
        return false
      }
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(v => {
          v.selected = false
        })
        val.selected = true
      }
      updateDisabledStatus(props.goods.specs, pathMap)
    }
    return { changeSku, pathMap }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
