<template>
    <main>
        <nav class="nav">
            <h2>
                <a
                    href="https://github.com/fabien0102/ts-to-zod"
                    target="_blank"
                >
                    ts-to-zod-playground
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
            ></MonacoEditor>
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
    width: 66.6vw;
}

.output {
    width: 33.3vw;
    height: 100%;
    font-size: 14px;
    overflow: scroll;
    box-sizing: border-box;
    margin: 0;
}
</style>
