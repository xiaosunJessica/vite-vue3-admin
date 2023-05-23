import { createApp } from 'vue'
import { setupStore } from '@/stores'
// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import './permission'
const setupAll = async () => {
  const app = createApp(App)

  setupStore(app)

  setupElementPlus(app)

  app.use(router)

  app.mount('#app')
}

setupAll()
