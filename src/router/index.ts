import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout/layout.vue'
import { cloneDeep } from 'lodash-es'
export const configRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home/table',
    name: '',
    meta: {
      hidden: true
    }
  },
  {
    path: '/home',
    redirect: '/home/table',
    component: Layout,
    name: 'home',
    meta: {
      title: '菜单一',
      icon: 'HomeFilled',
      alwaysShow: true
    },
    children: [
      {
        path: 'table',
        name: 'table',
        meta: {
          title: '菜单一-一'
        },
        component: () => import('@/views/home/index.vue')
      },
    ]
  },
]

export const useRouter1 = () => {
  const computedRouter = (userInfo) => {
    return cloneDeep(configRoutes).map((r) => {
      const tlViews = ['check', 'teamManage', 'overview']
      const adminViews = ['userManage']
      if (tlViews.includes(r.name)) {
        r.meta.hidden = Number(userInfo?.is_tl) !== 1
      }
      if (adminViews.includes(r.name)) {
        r.meta.hidden = userInfo?.role !== 'ADMIN'
      }
      return {
        ...r,
        children: r.children?.map((c: any) => {
          if (tlViews.includes(c.name)) {
            c.meta.hidden = Number(userInfo?.is_tl) !== 1
          }
          if (adminViews.includes(r.name)) {
            c.meta.hidden = userInfo?.role !== 'ADMIN'
          }
          return c
        })
      }
    })
  }

  return {
    computedRouter
  }
}
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: configRoutes as any
})

export default router
