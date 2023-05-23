<script lang="tsx">
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { TransitionGroup, defineComponent, ref, unref, watch } from 'vue'
import type { RouteLocationNormalizedLoaded, RouteMeta } from 'vue-router'
import { useRouter } from 'vue-router'
import { configRoutes } from '@/router'
import { filter, treeToList } from '@/utils/tree'
import { filterBreadcrumb } from './helper'
import Icon from '@/components/menu/icon.vue'
export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const { currentRoute } = useRouter()
    const levelList = ref<any[]>([])
    const getBreadcrumb = () => {
      const currentPath = currentRoute.value.matched.slice(-1)[0].path
      levelList.value = filter(filterBreadcrumb(configRoutes as any), (node: any) => {
        return node.path === currentPath
      })
    }

    const renderBreadcrumb = () => {
      const breadcrumbList = treeToList<AppRouteRecordRaw[]>(unref(levelList))
      return breadcrumbList.map((v) => {
        const disabled = !v.redirect || v.redirect === 'noredirect'
        const meta = v.meta as RouteMeta
        return (
          <ElBreadcrumbItem to={{ path: disabled ? '' : v.path }} key={v.name}>
            {meta?.icon ? (
              <div class="icon-title">
                <Icon style="width: 16px; height: 16px; margin-right: 5px;" type={meta?.icon} />
                {v?.meta?.title}
              </div>
            ) : (
              v?.meta?.title
            )}
          </ElBreadcrumbItem>
        )
      })
    }

    watch(
      () => currentRoute.value,
      (route: RouteLocationNormalizedLoaded) => {
        if (route.path.startsWith('/redirect/')) {
          return
        }
        getBreadcrumb()
      },
      {
        immediate: true
      }
    )

    return () => (
      <ElBreadcrumb separator="/" class={`flex items-center h-full ml-[10px]`}>
        <TransitionGroup appear>{renderBreadcrumb()}</TransitionGroup>
      </ElBreadcrumb>
    )
  }
})
</script>

<style lang="scss" scoped>
.icon-title {
  display: flex;
  align-items: center;
}
</style>
