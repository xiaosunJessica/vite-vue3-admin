import { defineStore } from 'pinia'
interface AppState {
  breadcrumb: boolean
  breadcrumbIcon: boolean
  collapse: boolean
  logo: boolean
  fixedHeader: boolean
  pageLoading: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      pageLoading: false, // 路由跳转loading

      breadcrumb: true, // 面包屑
      breadcrumbIcon: true, // 面包屑图标
      collapse: false, // 折叠菜单
      logo: true, // logo
      fixedHeader: true // 固定toolheader
    }
  },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb
    },
    getBreadcrumbIcon(): boolean {
      return this.breadcrumbIcon
    },
    getCollapse(): boolean {
      return this.collapse
    },
    getLogo(): boolean {
      return this.logo
    },
    getFixedHeader(): boolean {
      return this.fixedHeader
    },
    getPageLoading(): boolean {
      return this.pageLoading
    }
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
    },
    setBreadcrumbIcon(breadcrumbIcon: boolean) {
      this.breadcrumbIcon = breadcrumbIcon
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setLogo(logo: boolean) {
      this.logo = logo
    },
    setFixedHeader(fixedHeader: boolean) {
      this.fixedHeader = fixedHeader
    },
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading
    }
  }
})
