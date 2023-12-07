import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import hljsVuePlugin from '@highlightjs/vue-plugin'

hljs.registerLanguage('typescript', typescript)

createApp(App).use(hljsVuePlugin).mount('#app')
