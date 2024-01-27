<template>
    <main>
        <nav class="nav">
            <h2>
                <a
                    href="https://github.com/YieldRay/ts-to-zod-playground"
                    target="_blank"
                >
                    <span>ts-to-zod-playground</span
                    ><small>@{{ headHash }}</small>
                </a>
                <a
                    :href="`https://www.npmjs.com/package/ts-to-zod/v/${tsToZodVersion}`"
                    target="_blank"
                    style="padding-left: 0.5rem"
                >
                    <small class="version"
                        >ts-to-zod v{{ tsToZodVersion }}</small
                    >
                </a>
            </h2>
            <div>
                <button @click="onSave">save</button>
                <button @click="onCopy">copy</button>
            </div>
        </nav>
        <div class="layout">
            <MonacoEditor
                :value="initialValue"
                class="editor"
                @change="onChange"
                :style="{ width: editorWidth + 'px' }"
            />
            <div
                class="resizer"
                @pointerdown="onPointerDown"
                @pointermove="onPointerMove"
                @pointerup="onPointerUp"
                @pointercancel="onPointerUp"
            ></div>
            <highlightjs class="output" language="javascript" :code="output" />
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { ts2zod } from '@/utils/ts2zod'
import { debounce } from '@/utils/debounce'
import { copy } from '@/utils/copy'
import { saveAsTextFile } from '@/utils/saveFile'
import { exampleCode } from './exampleCode'

// versions const
const headHash = ref(__HEAD__.slice(0, 5))
const tsToZodVersion = ref(__ts_to_zod_version__)

const initialValue = localStorage.getItem('monaco-editor-value') ?? exampleCode
const output = ref('')

onMounted(() => {
    output.value = ts2zod(initialValue)
})

const onChange = debounce((value: string) => {
    output.value = ts2zod(value)

    if (value.length > 0) {
        localStorage.setItem('monaco-editor-value', value)
    } else {
        localStorage.removeItem('monaco-editor-value')
    }
}, 1000)

const onSave = () => {
    saveAsTextFile(output.value, 'schema.zod.ts')
}

const onCopy = () => {
    copy(output.value)
    alert('success!')
}

// this allow resize the pane
const editorWidth = ref(
    Number(localStorage.getItem('editorWidth')) ||
        (document.documentElement.clientWidth / 3) * 2,
)

let isPointerDown = false
let initialWidth = editorWidth.value
let pointerDownX = 0

const onPointerDown = (e: PointerEvent) => {
    ;(e.target as HTMLDivElement).setPointerCapture(e.pointerId)
    isPointerDown = true
    pointerDownX = e.clientX
    initialWidth = editorWidth.value
}
const onPointerUp = (e: PointerEvent) => {
    ;(e.target as HTMLDivElement).releasePointerCapture(e.pointerId)
    isPointerDown = false
}
const onPointerMove = (e: PointerEvent) => {
    if (!isPointerDown) return
    const distanceX = e.clientX - pointerDownX
    const w = Math.max(initialWidth + distanceX, 5)
    editorWidth.value = w
    localStorage.setItem('editorWidth', w.toString())
}
</script>

<style scoped>
main {
    height: 100%;
    display: flex;
    flex-direction: column;
    --nav-height: 42px;
}

a {
    text-decoration: none;
    color: inherit;
}

.version {
    font-size: small;
    color: #666;
    background: #dfdfdf;
    border-radius: 0.5rem;
    padding: 0.1rem 0.4rem;
}

.nav {
    border-bottom: solid 1px #eee;
    box-sizing: border-box;
    height: var(--nav-height);
    padding: 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    cursor: pointer;
    padding: 6px 12px;
    font-size: 16px;
    margin: 0 4px;
    border-radius: 8px;
    border: solid 1px #ccc;
}

button:active {
    border: solid 1px #666;
}

.layout {
    height: calc(100vh - var(--nav-height));
    display: flex;
}

.editor {
    flex: 0 1 auto;
}

.resizer {
    flex: 0 0 1px;
    height: 100%;
    border-left: solid 2px #fff;
    border-right: solid 2px #fff;
    background: #eee;
    cursor: col-resize;
}

.resizer:hover {
    border-left: solid 2px #eee;
    border-right: solid 2px #eee;
}

.output {
    flex: 1 1;
    height: 100%;
    font-size: 14px;
    overflow: scroll;
    box-sizing: border-box;
    margin: 0;
}
</style>
