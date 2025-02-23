<script setup lang="ts">

import EchartsHeatmap from "@/components/sub/EchartsHeatmap.vue";
import ClockCard from "@/components/card/ClockCard.vue";
import AdminCard from "@/components/card/AdminCard.vue";
import {onMounted, onUnmounted, ref} from "vue";
import CodingTimeCard from "@/components/card/CodingTimeCard.vue";

const side_bar_visibility = ref(true)
const custom_stylesheets = ref({
    momosachi_name : 'font-size: 40px;',
    identity_avatar: 150,
    card_border: 'border: 2px rgba(233,233,233,0.5) solid;',
    max_width: `max-width: ${window.innerWidth}px`
})
function resizeEventListener() {
    const pixel_ratio = window.devicePixelRatio > 1 ? window.devicePixelRatio : 1
    custom_stylesheets.value.momosachi_name = `font-size: ${40 / pixel_ratio}px`
    custom_stylesheets.value.identity_avatar = 150 / pixel_ratio
    custom_stylesheets.value.card_border = `border: ${2 / pixel_ratio}px rgba(233,233,233,0.5) solid;`
    custom_stylesheets.value.max_width = `max-width: ${window.innerWidth - 40}px`
}

onMounted(()=>{
    resizeEventListener()
    addEventListener('resize', resizeEventListener)
})

onUnmounted(()=>{
    removeEventListener('resize', resizeEventListener)
})

</script>

<template>
    <div class="about-momosachi-card card">
        <div class="blur-background"/>
        <AdminCard/>
    </div>
    <div class="pinned-card-set" :style="custom_stylesheets.max_width">
        <div class="upper-card-set">
            <div class="clock-card card">
                <div class="blur-background"/>
                <ClockCard/>
            </div>
            <div class="coding-time-card card">
                <div class="blur-background"/>
                <CodingTimeCard/>
            </div>
        </div>
        <div class="commit-action-card card">
            <div class="blur-background"></div>
            <EchartsHeatmap/>
        </div>
    </div>
</template>

<style scoped>
.blur-background{
    position: absolute;
    /*background: rgba(122,80,155,0.3);*/
    background: var(--var-c-bg-secondary);
    box-shadow: var(--var-card-box-shadow);
    backdrop-filter: blur(5px);
    transition: background ease-in-out 0.3s, box-shadow ease-in-out 0.3s, border ease-in-out 0.3s;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    max-width: 100%;
    z-index: -1;
    box-sizing: border-box;
}
.commit-action-card{
    border-radius: 15px;
    padding: 20px;
    position: relative;
    margin: 10px;
}
.card{
    border: 1px var(--var-card-color-border) solid;
    box-sizing: border-box;
    transition: border ease-in-out 0.3s;
}
.pinned-card-set{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 8px;
    border-radius: 15px;
    padding: 20px;
}
.about-momosachi-card{
    position: relative;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    width: 260px;
    height: 500px;
    padding: 20px;
    border-radius: 15px;
}

/* clock-card Begin */
.upper-card-set{
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.clock-card{
    position: relative;
    border-radius: 15px;
    margin: 20px;
}
/* clock-card End */
.coding-time-card{
    position: relative;
    border-radius: 15px;
    margin: 20px;
}
</style>