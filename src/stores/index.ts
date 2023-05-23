import type { App } from 'vue'
import { setActivePinia, createPinia } from 'pinia'

export const store = setActivePinia(createPinia())

export const setupStore = (app: App<Element>) => {
  app.use(store)
}
