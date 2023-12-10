<script setup lang="ts">
import * as monaco from 'monaco-editor'
import '@/components/web-worker'
import { ref, onMounted } from 'vue'

const props = defineProps<{
    /**
     * initial value, not controlled
     */
    value: string
    onChange?: (value: string) => void
}>()

const elem = ref<HTMLElement | null>(null)

const mountEditor = (target: HTMLElement) => {
    const newEditor = monaco.editor.create(target, {
        value: props.value,
        language: 'typescript',
        automaticLayout: true,
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window.editor = newEditor

    newEditor.onDidChangeModelContent(() =>
        props.onChange?.(newEditor.getValue())
    )

    return newEditor
}

onMounted(() => {
    mountEditor(elem.value!)
})
</script>

<template>
    <div ref="elem" class="monaco-editor"></div>
</template>

<style scoped>
.monaco-editor {
    height: 100%;
}
</style>
