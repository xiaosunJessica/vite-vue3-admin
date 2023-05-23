import type { RouteMeta } from 'vue-router'
import Icon from './icon.vue'

export const useRenderMenuTitle = () => {
  const renderMenuTitle = (meta: RouteMeta) => {
    const { title = 'Please set title', icon } = meta || {}

    return icon ? (
      <>
        <Icon style="width: 16px; height: 16px;" type={icon} />
        <span class="v-menu__title" style="margin-left: 5px;">
          {title}
        </span>
      </>
    ) : (
      <span class="v-menu__title">{title}</span>
    )
  }

  return {
    renderMenuTitle
  }
}
