<script setup>
import { ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
</script>
<template>
  <div class="loading">
    <ProgressSpinner />
  </div>
</template>

<style scoped lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #00000078;
  z-index: 2103;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  filter: blur(1px);
}
</style>
