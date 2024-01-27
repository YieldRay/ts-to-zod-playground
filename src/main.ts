import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import hljsVuePlugin from '@highlightjs/vue-plugin'

hljs.registerLanguage('typescript', typescript)

createApp(App).use(hljsVuePlugin).mount('#app')

declare global {
    const __ts_to_zod_version__: string
    const __HEAD__: string
}
