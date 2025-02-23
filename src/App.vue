<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import Header from "@/components/Header.vue";
import Copyright from "@/components/copyright/Copyright.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {useAppStore} from "@/stores";
import ToolBar from "@/components/sidebar/ToolBar.vue";
import {generateThemeColorSet} from "@/utils/theme-utils";

const appStore = useAppStore()
const route = useRoute()
let isScrolling = false
watch(()=>{
    return route.path
}, ()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})


function handleResize() {
    appStore.handleDeviceState()
    appStore.handleSideBarVisibility()
}

function smoothScroll(targetY : number, duration : number) {
    const appElement = document.querySelector('#app')
    if(!appElement) return
    const start = ref()
    const animation = (timestamp : number) => {
        if(start.value === undefined) start.value = timestamp
        const elapsed = timestamp - start.value


        if(elapsed <= duration) {
            requestAnimationFrame(animation)
        }else{
            isScrolling = false
        }
    }
    requestAnimationFrame(animation)
}

// 监听滚动事件
function onScroll() {
    if (!isScrolling) {
        isScrolling = true
        requestAnimationFrame(() => {
            smoothScroll(window.scrollY, 400); // 400ms 过渡
        })
    }
}
onMounted(()=>{
    handleResize()
    addEventListener('resize', handleResize)
    console.log(colorSet)
})
onUnmounted(()=>{
    removeEventListener('resize', handleResize)
})

// testing
const colorSet = generateThemeColorSet("#FFC0CB")

</script>

<template>
    <div class="header">
        <Header/>
    </div>
    <RouterView/>
    <ToolBar/>
    <div class="copyright">
        <Copyright/>
    </div>
</template>

<style scoped>
.header{
    height: 50px;
}
.copyright{
    height: 75px;
    background-color: var(--var-c-bg-main);
    transition: background-color ease-in-out 0.3s, color ease-in-out 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--var-c-text);
    flex-direction: column;
}
</style>
