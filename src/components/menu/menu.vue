<script lang="tsx">
import { defineComponent } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { useRenderMenuItem } from './useRenderMenuItem'
import { isUrl } from '@/utils/is'
import { useRouter } from 'vue-router'
// import usePermission from '@/stores/modules/permission'
import { useRouter1 } from '@/router'
import useUser from '@/stores/modules/user'
// const permissionStore = usePermission()
const appStore = useAppStore()
const collapse = computed(() => appStore.getCollapse)

const userStore = useUser()
const userInfo = computed(() => userStore.userInfo)
export default defineComponent({
  props: {
    menuSelect: {
      type: Function as PropType<(index: string) => void>,
      default: undefined
    }
  },
  setup() {
    const { push, currentRoute } = useRouter()

    const activeMenu = computed(() => {
      const { meta, path } = unref(currentRoute)
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })

    const onSelect = (index: string) => {
      // 自定义事件
      if (isUrl(index)) {
        window.open(index)
      } else {
        push(index)
      }
    }

    return () => (
      <el-menu
        backgroundColor="var(--left-menu-bg-color)"
        textColor="var(--left-menu-text-color)"
        activeTextColor="var(--left-menu-text-active-color)"
        class="el-menu-vertical-demo"
        default-active={unref(activeMenu)}
        collapse={collapse.value}
        onSelect={onSelect}
      >
        {{
          default: () => {
            const { renderMenuItem } = useRenderMenuItem()
            const { computedRouter } = useRouter1()
            const routers = computedRouter(userInfo.value)
            return renderMenuItem(routers as any)
          }
        }}
      </el-menu>
    )
  }
})
</script>

<style lang="scss" scoped>
.el-menu {
  width: var(--left-menu-max-width);
  box-sizing: content-box;
  background-color: initial;
  border: none;
  .el-menu-item {
    &.is-active {
      background-color: var(--left-menu-bg-active-color);
    }
  }
  .el-sub-menu {
    :deep(.el-sub-menu__title) {
      padding-right: 20px;
    }
  }
}

.el-menu--collapse {
  width: var(--left-menu-min-width);
}
</style>
