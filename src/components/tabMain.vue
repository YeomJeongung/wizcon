<script setup>
import tabMenus from '@/components/tabMenu.vue'
import tabDynamic from '@/components/tabView.vue'
import Button from 'primevue/button'
import { useTabStore } from '@/stores/tab.js'
const tabStore = useTabStore()
const addTab = (idx, nm, url) => {
  tabStore.addTabItem({ id: idx, name: nm, url: url })
}
</script>
<template>
  <div class="box-white h100 p-3">
    <div class="mb-3 flex gap-2">
      <Button @click="addTab(0, '메뉴1_tab', 'tabPage1')" label="메뉴1"></Button>
      <Button @click="addTab(1, '메뉴2_tab', 'tabPage2')" label="메뉴2"></Button>
      <Button @click="addTab(2, '메뉴3_tab', 'tabPage3')" label="메뉴3"></Button>
      <Button @click="addTab(3, '메뉴4_tab', 'tabPage4')" label="메뉴4"></Button>
    </div>
    <tabMenus />
    <tabDynamic />
  </div>
</template>

<style scoped lang="scss"></style>
