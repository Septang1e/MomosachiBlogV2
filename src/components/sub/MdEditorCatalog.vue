<script setup lang="ts">
import {MdCatalog} from "md-editor-v3";
const props = defineProps<{
    editorId: string
}>()

const scrollElement = document.documentElement
</script>

<template>
    <div class="catalog-card-wrap">
        <div class="catalog-header">
            <el-icon class="bx bx-calendar"/> 目录
        </div>
        <div class="catalog-content">
            <MdCatalog :editor-id="editorId" :scrollElement="scrollElement"/>
        </div>
    </div>
</template>

<style scoped>
.catalog-card-wrap{
    width: 260px;
    height: fit-content;
    overflow: hidden;
    background-color: var(--var-c-bg-main);
    transition: background ease-in-out 0.3s, box-shadow ease-in-out 0.3s, border ease-in-out 0.3s;
    border-radius: 8px;
    padding: 20px;
    min-height: 50px;
    color: var(--var-c-text);
}
.catalog-header{
    display: flex;
    align-items: center;
    font-size: var(--var-c-card-title-font-size);
    font-weight: bold;
}
.catalog-content{
    font-size: var(--var-c-card-item-font-size);
}
</style>