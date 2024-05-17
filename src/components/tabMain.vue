<script setup>
import { onMounted,ref,computed,watch } from 'vue'
import tabMenus from '@/components/tabMenu.vue'
import tabDynamic from '@/components/tabView.vue'
import { useTabStore } from '@/stores/tab.js'
import { useAlertStore } from '@/stores/alert.js'
import '../assets/tab.scss'
import 'primeflex/primeflex.scss';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
const alertStore = useAlertStore()
const alertView = computed(() => alertStore.alertView())
const tabStore = useTabStore()
const addTab = (idx, nm, url, type) => {
  tabStore.addTabItem({ id: idx, name: nm, url: url, type: type })
}
const dashboard = () => {
  tabStore.dashboard()
}
onMounted(() => {
  //로컬스토리지 사용
  tabStore.addLocals();
});

const alertYn = ref(false);
const confirm = useConfirm();

watch(alertView, (val) => {
  alertYn.value = val
  if(alertYn.value){
    confirm.require({
        group: 'headless',
        header: alertStore.alertLObj.title,
        message: alertStore.alertLObj.cnt,
        accept: () => {
          alertStore.alertLClose()
        },
        reject: () => {
          alertStore.alertLClose()
        }
    });
  }

})

const menuItems = ref([
  {
    label: '사용자관리',
    items: [
        { id : 0, label: '회원관리', url: 'tabPage1' },
        { id : 1, label: '관리자 등록', url: 'tabPage2', type: 'popup' },
        { id : 2, label: 'API 관리', url: 'tabPage3' },
        { id : 3, label: '회원등록', url: 'tabPage4' }
    ]
  },
  {
    label: '설정',
    items: [
        { id : 500, label: '페이지 설정', url: 'tabPage6' },
        { id : 501, label: '없어페이지', url: 'tabPage7' },
    ]
  }
])
const menu = ref();
const toggle = (event) => {
    menu.value.toggle(event);
};
</script>
<template>
  <ConfirmDialog group="headless">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
              <span class="font-bold text-2xl block mb-4">{{ message.header }}</span>
              <p class="mb-0 mt-0 text-center" style="min-width: 14rem">{{ message.message }}</p>
              <div class="flex align-items-center gap-2 mt-4">
                  <!--<Button label="Save" @click="acceptCallback"></Button>-->
                  <Button label="확인" outlined @click="rejectCallback"></Button>
              </div>
          </div>
      </template>
  </ConfirmDialog>
  <div class="layout-page">
    <div class="left">
      <!--나중에-->
      <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" v-show="false" />
      <!--나중에-->

      <div class="overflow-hidden h-full">
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
              <div :class="[item.url == tabStore.menuActive && item.type !== 'popup' ? 'active':'']">
                <a v-ripple class="flex align-items-center justify-content-between" v-bind="props.action" @click="addTab(item.id, item.label, item.url, item?.type)">
                  {{ item.label }} 
                  <span v-if="item.type == 'popup'" v-tooltip.top="'Layer Popup'">
                    <i class="pi pi-external-link" style="font-size: 0.8rem; color: #708090"></i>
                  </span>
                </a>
              </div>
          </template>
          <template #end>
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
