<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
const width = ref("")
onMounted(()=>{
    scrollEventListener()
    addEventListener('scroll', scrollEventListener)
})
onUnmounted(()=>{
    removeEventListener('scroll', scrollEventListener)
})

function scrollEventListener() {
    // width
    const app = document.querySelector('#app')
    if(app) {
        width.value = `width: ${window.scrollY / (app.clientHeight - window.innerHeight) * 100}%`
    }
}

</script>

<template>
    <div class="progress-bar-container">
        <div class="progress-bar" :style="width"/>
    </div>
</template>

<style scoped>
.progress-bar-container{
    top: 0;
    height: 6px;
    width: 100%;
    z-index: 999;
    position: fixed;
}
.progress-bar{
    height: 100%;
    border-radius: 0 2px 2px 0;
    background-color: lightskyblue;
}
</style>