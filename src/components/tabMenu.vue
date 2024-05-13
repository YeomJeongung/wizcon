<script setup>
import { ref, computed, watch } from 'vue'
import { useTabStore } from '@/stores/tab.js'
import TabMenu from 'primevue/tabmenu'

const tabStore = useTabStore()
const tabItems = computed(() => tabStore.getTabItems())
const tabIdx = computed(() => tabStore.getTabIdx())
const menuList = ref(tabItems.value)
const tabIdxValue = ref(tabIdx.value)

// tabIdx 값이 변경될 때마다 tabIdxValue를 업데이트
watch(tabIdx, (newIdx) => {
  tabIdxValue.value = newIdx
})
watch(tabItems, (newList) => {
  menuList.value = newList
})
</script>
<template>
  <div class="tabmenulist">
    <TabMenu :model="menuList" :activeIndex="tabIdxValue" v-if="menuList.length > 0">
      <template #item="{ item }">
        <div class="tab-wrap">
          <div class="tab-link" @click="tabStore.addTabItem({ id: item.id, name: item.name, url: item.url })">
            {{ item.name }}
          </div>
          <span class="tab-icon" v-tooltip.top="{ value: 'close', showDelay: 0, hideDelay: 100 }" @click="tabStore.closeTab(item.id)">
            <i class="pi pi-times"></i>
          </span>
        </div>
      </template>
    </TabMenu>
  </div>
</template>
<style scoped lang="scss"></style>
