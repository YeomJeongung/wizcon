<template>
  <div class="box-white b100">
    <keep-alive>
      <component :is="dynamicComponent" v-if="dynamicComponent" :key="tempId" />
      <div class="mt-3" v-else>no data</div>
    </keep-alive>
  </div>
</template>

<script setup>
import { computed, shallowRef, watch, ref } from 'vue'
import { useTabStore } from '@/stores/tab.js'

/* page imports */
import tabPage1 from '../components/page/tabPage1.vue'
import tabPage2 from '../components/page/tabPage2.vue'
import tabPage3 from '../components/page/tabPage3.vue'
import tabPage4 from '../components/page/tabPage4.vue'
const tabArr = [tabPage1,tabPage2,tabPage3,tabPage4]
/* page imports_ end */

const tabStore = useTabStore()
const tabCurItem = computed(() => tabStore.getCurTabItems())

let tempId = ref(0)
const dynamicComponent = shallowRef(null)

// 빌드시 경로 찾을 수 없어.... 위 따로 import 방법을 찾아야함.
const loadDynamicComponent = async () => {
  const newItem = tabCurItem.value[0]
  if (newItem) {
    //const componentPath = `../page/${newItem.url}`
    try {
      //const { default: component } = await import(/* @vite-ignore */ componentPath)
      //dynamicComponent.value = component
      dynamicComponent.value = tabArr[newItem.id]
    } catch (error) {
      console.error('Error:', error)
    }
    tempId.value = newItem.idgen
  }
}

watch(
  tabCurItem,
  () => {
    if (tabCurItem.value.length == 1) {
      loadDynamicComponent()
    } else {
      dynamicComponent.value = null
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss"></style>
