import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import solidSvg from 'vite-plugin-solid-svg'
import monkey from 'vite-plugin-monkey'

export default defineConfig({
  plugins: [
    solidPlugin(),
    solidSvg(),
    monkey({
      entry: 'src/index.tsx',
      build: {
        autoGrant: true
      },
      userscript: {
        version: '0.1.2',
        name: 'Boluo Attribute Extension',
        author: 'AutumnSaury',
        description: '菠萝角色属性扩展',
        homepageURL: 'https://github.com/AutumnSaury/boluo-attribute-extension',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=boluo.chat',
        namespace: 'https://boluo.chat',
        match: ['https://boluo.chat/chat/*']
      }
    })
  ],
  build: {
    target: 'chrome89',
    cssMinify: 'esbuild'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
