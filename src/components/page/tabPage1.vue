<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button';
import { useAlertStore } from '@/stores/alert.js'
import { useTabStore } from '@/stores/tab.js'
const alertStore = useAlertStore()
const tabStore = useTabStore()
alertStore.alertL('알림','page1 mount alert')

const t = () => {
  alertStore.alertL('알림','test')
}

</script>
<template>
  <div class="flex flex-column gap-2">
    <label for="username">Username</label>
    <InputText id="username" aria-describedby="username-help" />
    <small id="username-help">Enter your Username to reset your password.</small>
    <div class="flex gap-2">
      <Button @click="t" outlined>username</Button>
      <Button @click="tabStore.addTabItem({ id : 500, name: '페이지 설정', url: 'tabPage6', type : 'tab' })" outlined>페이지설정</Button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
