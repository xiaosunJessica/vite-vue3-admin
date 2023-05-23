import path, { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
const root = process.cwd()
function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}
const pathSrc = fileURLToPath(new URL('./src', import.meta.url))
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env: any = loadEnv(mode, pathResolve('config'))
  return {
    base: env.VITE_BASE_PATH,
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      assetsDir: './assets/',
      minify: 'terser',
      sourcemap: false,
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: {}
        },
        plugins: []
      },
      terserOptions: {
        compress: {
          drop_console: command === "build" && env.mode === "prod",
          drop_debugger: command === "build" && env.mode === "prod"
        }
      },
      cssTarget: 'chrome83'
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],

        dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'),
      }),

      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],

        dts: path.resolve(pathSrc, 'types', 'components.d.ts'),
      }),

      Icons({
        autoInstall: true,
      }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [{
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/es/components/${name.substring(3)}/style/css`
          }
        }]
      }),

    ],
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@import "@/styles/index.scss";',
    //       javascriptEnabled: true
    //     }
    //   }
    // },
    resolve: {
      alias: {
        '@': pathSrc
      }
    },
    server: {
      open: true,
      host: '0.0.0.0',
      // cors: true, // 允许跨域
      proxy: {
        '/api': {
          target: `http://localhost:5000`,
          changeOrigin: true,
        }
      }
    },
  }
})
