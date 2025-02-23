<script setup lang="ts">
import {useAppStore} from "@/stores";

const appStore = useAppStore()
</script>

<template>
    <div class="error-container">
        <div class="error-404" v-if="!appStore.isMobile()">
            404 NOT FOUND
        </div>
        <div class="error-404-mobile" v-else>
            无法找到此页面
        </div>
    </div>
</template>

<style>
.error-container{
    min-height: var(--var-screen-height);
    background-color: var(--var-c-bg-secondary);
}
.error-404{
    font-size: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-shadow: var(--var-c-hover-bg) 2px 2px 5px;
    color: var(--var-c-hover-text);
    flex-wrap: nowrap;
    height: 100%;
}
.error-404-mobile{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 24px;
    color: var(--var-c-hover-text);
    text-shadow: var(--var-c-hover-bg) 2px 2px 5px;
}
</style>