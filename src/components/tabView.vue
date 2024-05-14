<template>
  <keep-alive>
    <component :is="dynamicComponent" v-if="dynamicComponent" :key="tempId" />
    <component :is="dashboard" v-else key="dashboard" />
  </keep-alive>
</template>

<script setup>
import { computed, shallowRef, watch, ref } from 'vue'
import { useTabStore } from '@/stores/tab.js'

/* page imports */
import dashboard from '../components/page/dashboard.vue'
import notfound from '../components/page/notfound.vue'
import tabPage1 from '../components/page/tabPage1.vue'
import tabPage2 from '../components/page/tabPage2.vue'
import tabPage3 from '../components/page/tabPage3.vue'
import tabPage4 from '../components/page/tabPage4.vue'
const tabObj = {
  tabPage1 : tabPage1,
  tabPage2 : tabPage2,
  tabPage3 : tabPage3,
  tabPage4 : tabPage4
}
/* page imports_ end */

const tabStore = useTabStore()
const tabCurItem = computed(() => tabStore.getCurTabItems())

let tempId = ref(0)
const dynamicComponent = shallowRef(null)

// 빌드시 경로 찾을 수 없어.... 
const loadDynamicComponent = async () => {
  const newItem = tabCurItem.value[0]
  if (newItem) {
    try {
      if(tabObj[newItem.url]){
        dynamicComponent.value = tabObj[newItem.url]
      }else if(tabStore.menuActive === 'dashboard'){
        dynamicComponent.value = dashboard
      }else{
        dynamicComponent.value = notfound
      }
    } catch (error) {
      console.error('Error:', error)
    }
    tempId.value = newItem.idgen
  }else{
    dynamicComponent.value = dashboard
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
