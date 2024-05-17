<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button';
import { useAlertStore } from '@/stores/alert.js'
const alertStore = useAlertStore()

alertStore.alertL('알림','page1 mount alert')
</script>
<template>
  <div class="flex flex-column gap-2">
    <label for="username">Username</label>
    <InputText id="username" aria-describedby="username-help" />
    <small id="username-help">Enter your username to reset your password.</small>
  </div>
</template>

<style scoped lang="scss"></style>
