<script lang="tsx">
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { ElScrollbar } from 'element-plus'
import Menu from '@/components/menu/menu.vue'
import Header from '@/components/header-breadcrumb/header.vue'
import AppView from './app-view.vue'

const appStore = useAppStore()
// 菜单折叠
const collapse = computed(() => appStore.getCollapse)

// 固定头部
const fixedHeader = computed(() => appStore.getFixedHeader)

export default defineComponent({
  name: 'Layout',
  setup() {
    return () => (
      <section class="layout">
        <div
          class={[
            'layout-left',
            {
              'w-[var(--left-menu-min-width)]': appStore.getCollapse,
              'w-[var(--left-menu-max-width)]': !appStore.getCollapse
            }
          ]}
          style="transition: all 0.3s ease;"
        >
          <div class="logo" style="transition: all 0.3s ease;">
            <router-link to="/">
              <div class="logo-title">
                <img src={new URL('@/assets/logo.svg', import.meta.url).href} />
                <div
                  style={`width: ${
                    collapse.value ? '0' : 'fit-content'
                  }; overflow: hidden;transition: all 0.3s ease; white-space: nowrap;`}
                >
                  管理系统
                </div>
              </div>
            </router-link>
          </div>
          <Menu class="menu"></Menu>
        </div>
        <div
          class={[
            `layout-content`,
            {
              'w-[calc(100% - var(--left-menu-min-width)])] left-[var(--left-menu-min-width)]':
                collapse.value,
              'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]':
                !collapse.value
            }
          ]}
        >
          <ElScrollbar
            class={['content-scrollbar', { 'mg-top-80': fixedHeader.value }]}
            v-loading={appStore.pageLoading}>
            <div
              class={[
                `header-tag`,
                {
                  'left-[var(--left-menu-min-width)]': collapse.value,
                  'left-[var(--left-menu-max-width)]': !collapse.value
                }
              ]}
              style="transition: all 0.3s ease;"
            >
              <Header />
            </div>

            <div class="app-view">
              <AppView></AppView>
            </div>
          </ElScrollbar>
        </div>
      </section>
    )
  }
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  background-color: #f5f7f9;
  .layout-left {
    height: 100vh;
    overflow: hidden;
    background-color: var(--left-menu-bg-color);
    .logo {
      height: var(--logo-height);
      width: 100%;
      .logo-title {
        height: var(--logo-height);
        padding: 2px;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        img {
          height: calc(var(--logo-height) - 4px);
          margin-right: 5px;
        }
      }
    }
    .menu {
      height: calc(100% - var(--logo-height));
      overflow-y: auto;
    }
  }
  .layout-content {
    flex: 1;
    .header-tag {
      position: fixed;
      top: 0;
      right: 0;
      height: var(--header-height);
      background-color: #fff;
    }
    .mg-top-80 {
      margin-top: var(--header-height);
    }
    .app-view {
      padding: 12px;
    }
  }
}
.w-\[var\(--left-menu-max-width\)\] {
  width: var(--left-menu-max-width);
}
.w-\[var\(--left-menu-min-width\)\] {
  width: var(--left-menu-min-width);
}
.w-\[calc\(100\%-var\(--left-menu-min-width\)\)\] {
  width: calc(100% - var(--left-menu-min-width));
}
.w-\[calc\(100\%-var\(--left-menu-max-width\)\)\] {
  width: calc(100% - var(--left-menu-max-width));
}
.left-\[var\(--left-menu-min-width\)\] {
  left: var(--left-menu-min-width);
}
.left-\[var\(--left-menu-max-width\)\] {
  left: var(--left-menu-max-width);
}
</style>
