<template>
  <div class="box-white b100">
    <!-- 동적으로 로드된 컴포넌트를 렌더링 -->
    <keep-alive>
      <component :is="dynamicComponent" v-if="dynamicComponent" :key="tempId" />
      <div class="mt-3" v-else>no data</div>
    </keep-alive>
  </div>
</template>

<script setup>
import { computed, shallowRef, watch, ref } from 'vue'
import { useTabStore } from '@/stores/tab.js'

const tabStore = useTabStore()
const tabCurItem = computed(() => tabStore.getCurTabItems())

let tempId = ref(0)
// 동적 컴포넌트를 담을 변수 ref안됨.
const dynamicComponent = shallowRef(null)

// URL을 기반으로 동적 컴포넌트 로드
const loadDynamicComponent = async () => {
  const newItem = tabCurItem.value[0]
  if (newItem) {
    const componentPath = './' + (newItem.url || 'tabPage1.vue')
    try {
      const { default: component } = await import(/* @vite-ignore */ componentPath)
      dynamicComponent.value = component
    } catch (error) {
      console.error('Error:', error)
    }
    tempId.value = newItem.id
  }
}

//변경
watch(
  tabCurItem,
  () => {
    if (tabCurItem.value.length == 1) {
      loadDynamicComponent()
    } else {
      dynamicComponent.value = null
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss"></style>
