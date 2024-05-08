<script setup>
//import { ref, defineProps } from 'vue'
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
      <Button @click="addTab(120, '메뉴1_tab', 'tabPage1.vue')" label="메뉴1"></Button>
      <Button @click="addTab(121, '메뉴2_tab', 'tabPage2.vue')" label="메뉴2"></Button>
      <Button @click="addTab(122, '메뉴3_tab', 'tabPage3.vue')" label="메뉴3"></Button>
      <Button @click="addTab(123, '메뉴4_tab', 'tabPage4.vue')" label="메뉴4"></Button>
    </div>
    <tabMenus />
    <tabDynamic />
  </div>
</template>

<style scoped lang="scss"></style>
