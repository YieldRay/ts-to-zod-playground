import { fileURLToPath, URL } from 'node:url'
import tsToZodPkg from './node_modules/ts-to-zod/package.json' assert { type: 'json' }
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { execSync } from 'node:child_process'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    define: {
        __ts_to_zod_version__: JSON.stringify(tsToZodPkg.version),
        __HEAD__: JSON.stringify(
            execSync('git rev-parse HEAD', { encoding: 'utf8' }),
        ),
    },
})
