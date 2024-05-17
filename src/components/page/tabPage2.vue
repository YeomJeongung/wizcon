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
</script>
<template>
  <div class="flex flex-column gap-2">
    <label for="username">Username</label>
    <InputText id="username" aria-describedby="username-help" />
    <small id="username-help">Enter your username to reset your password.</small>
  </div>
  <div class="mt-3 text-right">
    <Button @click="popClose" label="확인" outlined></Button>
  </div>
</template>

<style scoped lang="scss"></style>
