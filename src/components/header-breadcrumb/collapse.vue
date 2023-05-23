<script setup lang="ts">
import { computed, unref } from 'vue'
import { useAppStore } from '@/stores/modules/app'
defineProps({
  color: {
    type: String
  }
})

const appStore = useAppStore()

const collapse = computed(() => appStore.getCollapse)

const toggleCollapse = () => {
  const collapsed = unref(collapse)
  appStore.setCollapse(!collapsed)
}
</script>

<template>
  <div style="margin-right: 12px; font-size: 0; cursor: pointer">
    <el-icon @click="toggleCollapse" :size="20">
      <i-ep-expand v-if="collapse" />
      <i-ep-fold v-else />
    </el-icon>
  </div>
</template>
