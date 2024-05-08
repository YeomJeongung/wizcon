<script setup>
import { ref, computed, watch } from 'vue'
import { useTabStore } from '@/stores/tab'
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
</script>
<template>
  <div class="white-box">
    <div class="tabmenulist">
      <TabMenu :model="menuList" :activeIndex="tabIdxValue">
        <template #item="{ item }">
          <div :class="['flex gap-2 p-2']">
            <div @click="tabStore.addTabItem({ id: item.id, name: item.name, url: item.url })">
              {{ item.name }}
            </div>
            <span class="icon-time pr-2" @click="tabStore.closeTab(item.id)"> x </span>
          </div>
        </template>
      </TabMenu>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
