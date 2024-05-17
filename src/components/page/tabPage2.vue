<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button';
import { computed } from 'vue';
import { useAlertStore } from '@/stores/alert.js'
import { useTabStore } from '@/stores/tab.js'
const alertStore = useAlertStore()
const tabStore = useTabStore()
const tabCurItem = computed(() => tabStore.getCurTabItems())
const popClose = () => {
  tabStore.closeTab(tabCurItem.value[0].id)
}
const t = () => {
  tabStore.closeTab(tabCurItem.value[0].id)
  tabStore.addTabItem({ id : 500, name: '페이지 설정', url: 'tabPage6', type : 'tab' })
}
</script>
<template>
  <div class="flex flex-column gap-2">
    <label for="username">Username</label>
    <InputText id="username" aria-describedby="username-help" />
    <small id="username-help">Enter your username to reset your password.</small>
  </div>
  <div class="mt-3 flex gap-2 justify-content-end">
    <Button @click="t">페이지설정</Button>
    <Button @click="popClose" label="확인" outlined></Button>
  </div>
</template>

<style scoped lang="scss"></style>
