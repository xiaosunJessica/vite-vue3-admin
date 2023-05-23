<script setup lang="ts">
import Collapse from './collapse.vue'
import Breadcrumb from './breadcrumb.vue'
import useUser from '@/stores/modules/user'
import { ArrowDown } from '@element-plus/icons-vue'
const userStore = useUser()

const name = computed(() => userStore?.userInfo?.name)

const handleCommand = async(command: string | number | object) => {
  if (command === 'logout') {
    await userStore.logout()
  }
}
</script>

<template>
  <div class="header-group">
    <div class="header-left">
      <Collapse />
      <Breadcrumb />
    </div>
     <el-dropdown
      :hide-on-click="false"
      @command="handleCommand">
      <span class="el-dropdown-link">
        <span style="cursor: pointer;">hi, {{ name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.header-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  .header-left {
    display: flex;
    align-items: center;
  }
  :deep(.el-dropdown-link) {
    outline-color: transparent;
  }
}
</style>
