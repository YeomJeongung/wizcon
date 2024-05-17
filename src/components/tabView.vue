<template>
  <div class="h-full" v-show="dynmaicType == 'popup'">
    <Dialog :visible="dynmaicPopshow" modal>
      <template #container="{ closeCallback }">
        <div class="p-3">
          <div class="mb-2">
            <strong class="text-lg">{{ tabCurItem[0].name }}</strong>
          </div>
          <component :is="dynamicComponent" v-if="dynamicComponent" :key="tempId" />
        </div>
      </template>
    </Dialog>
  </div>
  <div class="h-full" v-show="dynmaicType == 'tab' || !dynmaicType">
    <keep-alive>
      <component :is="dynamicComponent" v-if="dynamicComponent" :key="tempId" />
      <component :is="dashboard" v-else key="dashboard" />
    </keep-alive>
  </div>
  
</template>

<script setup>
import { computed, shallowRef, watch, ref } from 'vue'
import { useTabStore } from '@/stores/tab.js'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

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
const dynmaicType = ref('tab')
const dynmaicPopshow = ref(false)

// 빌드시 경로 찾을 수 없어.... 
const loadDynamicComponent = async () => {
  const newItem = tabCurItem.value[0]
  if (newItem) {
    try {
      dynmaicPopshow.value = false
      if(tabObj[newItem.url]){
        if(newItem.type === 'tab'){
          dynmaicType.value = 'tab'
        }else if(newItem.type === 'popup'){
          dynmaicType.value = 'popup'
          dynmaicPopshow.value = true
        }else{
          dynmaicType.value = 'tab' 
        }
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
