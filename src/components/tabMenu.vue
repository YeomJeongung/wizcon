<script setup>
import { ref, computed, watch } from 'vue'
import { useTabStore } from '@/stores/tab.js'
import TabMenu from 'primevue/tabmenu'
import { useConfirm } from "primevue/useconfirm";
import ConfirmPopup from 'primevue/confirmpopup';

const tabStore = useTabStore()
const tabItems = computed(() => tabStore.getTabItems())
const tabIdx = computed(() => tabStore.getTabIdx())
const menuList = ref(tabItems.value)
const tabIdxValue = ref(tabIdx.value)


const confirm = useConfirm();
const confirm1 = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: '모든탭을 지우시겠습니까?',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'c-btn-gray',
        acceptClass: 'c-btn-red',
        rejectLabel: '취소',
        acceptLabel: '지움',
        accept: () => {
            tabStore.reloadTab()
        },
        reject: () => {
            //
        }
    });
};

// tabIdx 값이 변경될 때마다 tabIdxValue를 업데이트
watch(tabIdx, (newIdx) => {
  tabIdxValue.value = newIdx
})
watch(tabItems, (newList) => {
  menuList.value = newList
})
</script>
<template>
  <ConfirmPopup></ConfirmPopup>
  <div class="tabmenulist" v-if="menuList.length > 0">
    <div class="reload-tab">
      <span class="pi-btn" @click="confirm1($event)">
        <i class="pi pi-sync"></i>
      </span>
    </div>
    <div class="tabmenuitems scroll-d">
      <TabMenu :model="menuList" :activeIndex="tabIdxValue" v-if="menuList.length > 0">
        <template #item="{ item }">
          <div class="tab-wrap">
            <div class="tab-link" @click="tabStore.addTabItem({ id: item.id, name: item.name, url: item.url, type : item.type })">
              {{ item.name }}
            </div>
            <span class="tab-icon" v-tooltip.top="{ value: 'close' }" @click="tabStore.closeTab(item.id)">
              <i class="pi pi-times"></i>
            </span>
          </div>
        </template>
      </TabMenu>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
