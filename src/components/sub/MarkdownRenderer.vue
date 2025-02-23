<script lang="ts" setup>
import {reactive} from "vue";
import {MdPreview, config} from "md-editor-v3";
// Themes
import 'md-editor-v3/lib/preview.css'
import '@/assets/md_editor_default.css'
import 'highlight.js/styles/brown-paper.css'
const props = defineProps<{
    article: string,
    theme: string,
    editorId: string,
}>()

// 主题预设
const state = reactive({
    text: props.article,
    theme: props.theme,
    id: props.editorId
});
// config({
//     editorExtensions: {
//         highlight: {
//             css: {
//                 xxxxx: {
//                     light:
//                         'https://unpkg.com/highlight.js@11.2.0/styles/xxxxx-light.css',
//                     dark: 'https://unpkg.com/highlight.js@11.2.0/styles/xxxxx-dark.css',
//                 },
//                 yyyyy: {
//                     light: "https://unpkg.com/highlight.js@11.2.0/styles/1c-light.min.css",
//                     dark: 'https://unpkg.com/highlight.js@11.2.0/styles/xxxxx-dark.css',
//                 },
//             },
//         },
//     },
// });
</script>

<template>
    <MdPreview class="md-editor-dark" :id="state.id" :modelValue="article" :previewTheme="state.theme" codeTheme="yyyyy"/>
</template>

<style scoped>
/* 文章 */
#preview-only{
    background-color: transparent !important;
}
</style>