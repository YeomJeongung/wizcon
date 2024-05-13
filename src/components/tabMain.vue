<script setup>
import { onMounted,ref } from 'vue'
import tabMenus from '@/components/tabMenu.vue'
import tabDynamic from '@/components/tabView.vue'
import { useTabStore } from '@/stores/tab.js'
import '../assets/tab.scss'
import 'primeflex/primeflex.scss';
import Menu from 'primevue/menu';
import Button from 'primevue/button';

const tabStore = useTabStore()
const addTab = (idx, nm, url) => {
  tabStore.addTabItem({ id: idx, name: nm, url: url })
}
const dashboard = () => {
  tabStore.dashboard()
}
onMounted(() => {
  //로컬스토리지 사용
  tabStore.addLocals();
});

const menuItems = ref([
  {
    label: '사용자관리',
    items: [
        { id : 0, label: '회원관리', url: 'tabPage1.vue' },
        { id : 1, label: '관리자 등록', url: 'tabPage2.vue' },
        { id : 2, label: 'API 관리', url: 'tabPage3.vue' },
        { id : 3, label: '회원등록', url: 'tabPage4.vue' }
    ]
  }
])
const menu = ref();
const toggle = (event) => {
    menu.value.toggle(event);
};
</script>
<template>
  <div class="layout-page">
    <div class="left">
      <!--나중에-->
      <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" v-show="false" />
      <!--나중에-->

      <div class="overflow-x-hidden overflow-y-auto h-full">
        <Menu :model="menuItems" ref="menu" :popup="false">
          <template #start>
            <div class="logo" @click="dashboard()">
              <img src="@/assets/images/logo.svg" alt="logo" width="100" />
            </div>
          </template>
          <template #submenuheader="{ item }">
            <span>{{ item.label }}</span>
          </template>
          <template #item="{ item, props }">
              <a v-ripple class="flex align-items-center" v-bind="props.action" @click="addTab(item.id, item.label, item.url)">
                {{ item.label }}
              </a>
          </template>
          <template #end>
              end
          </template>
        </Menu>
      </div>
    </div>
    <div class="right">
      <tabMenus />
      <div class="cont overflow-x-hidden overflow-y-auto h-full">
        <tabDynamic />
      </div>
      <div class="copy">
        © 2024 WIZCON. All rights reserved.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
