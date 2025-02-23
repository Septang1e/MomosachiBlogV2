<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useAppStore} from "@/stores";
import {getCurrentTheme, setTheme} from "@/utils/local-storage";


// Theme
const appStore = useAppStore()
const current_theme = ref("")
function initThemeState() {
    const theme_now = ref(getCurrentTheme())
    if(null === theme_now.value) {
        theme_now.value = getPreferredTheme()
    }
    appStore.setTheme(theme_now.value)
    document.body.classList.add(appStore.getCurrentTheme())
    current_theme.value = theme_now.value
}
function getPreferredTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'light'; // 默认主题
}
function toggleTheme() {
    const theme_now = ref(appStore.getCurrentTheme())
    document.body.classList.remove(theme_now.value)
    theme_now.value = theme_now.value === 'light' ? 'dark' : 'light';
    document.body.classList.add(theme_now.value)
    appStore.setTheme(theme_now.value)
    setTheme(theme_now.value)
    current_theme.value = theme_now.value
}

onMounted(()=>{
    initThemeState()
})
</script>

<template>
    <div class="tool-bar-wrap">
        <div class="theme-handler" @click="toggleTheme">
            <el-icon :size="20" class="bx" :class="current_theme === 'light' ? 'bx-moon' : 'bx-sun'"/>
        </div>
    </div>
</template>

<style scoped>
.tool-bar-wrap{
    position: fixed;
    bottom: 100px;
    right: 10px;
}
.theme-handler{
    cursor: pointer;
    color: var(--var-c-sub-text);
    width: 35px;
    height: 35px;
    background-color: var(--var-c-bg-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
}
</style>