<template>
  <div class="box-white b100">
    <!-- 동적으로 로드된 컴포넌트를 렌더링 -->
    <keep-alive :exclude="excludedComponents">
      <component :is="dynamicComponent" v-if="dynamicComponent" :key="tempId" />
    </keep-alive>
  </div>
</template>

<script setup>
import { computed, shallowRef, watch, ref } from 'vue'
import { useTabStore } from '@/stores/tab'

const tabStore = useTabStore()
const tabCurItem = computed(() => tabStore.getCurTabItems())
const tabClose = computed(() => tabStore.getCloseIdx())

let tempId = ref(0)
// 동적 컴포넌트를 담을 변수 ref안됨.
const dynamicComponent = shallowRef(null)
// 제외할 컴포넌트 배열
const excludedComponents = ref([])
// URL을 기반으로 동적 컴포넌트 로드
const loadDynamicComponent = async () => {
  const newItem = tabCurItem.value[0]
  if (newItem) {
    const componentPath = './' + (newItem.url || 'tabPage1.vue').substring(2)
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
    loadDynamicComponent()
  },
  { immediate: true }
)
//변경
watch(
  tabClose,
  (newCloseIdx) => {
    console.log(excludedComponents)
    const idx = excludedComponents.value.findIndex((id) => id === newCloseIdx)
    if (idx !== -1) {
      excludedComponents.value.splice(idx, 1)
    }
    console.log(newCloseIdx)
  },
  { immediate: true }
)
</script>

<style scoped lang="scss"></style>
