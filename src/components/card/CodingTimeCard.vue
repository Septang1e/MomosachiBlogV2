<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useAppStore} from "@/stores";

const appStore = useAppStore()
const codingDetails = reactive([
    {language: 'Java', coding_time: '10 hrs 47 mins', percentage: 0},
    {language: 'Vue.js', coding_time: '10 hrs 47 mins', percentage: 0},
    {language: 'TypeScript', coding_time: '10 hrs 47 mins', percentage: 0},
    {language: 'Html', coding_time: '10 hrs 47 mins', percentage: 0},
    {language: 'Golang', coding_time: '47 mins', percentage: 0},
])

const currentTimeRange = ref("last_week")


function initData() {
    const languagesData = appStore.getWakatimeStats().last_week.data.languages
    codingDetails.length = 0
    for(let i = 0; i < 5 && i < languagesData.length; ++i) {
        codingDetails.push({language: languagesData[i].name, coding_time: languagesData[i].text, percentage: 0})
    }
    setTimeout(()=>{
        for(let i = 0; i < codingDetails.length; ++i) {
            codingDetails[i].percentage = languagesData[i].percent
        }
    },50)
}

onMounted(()=>{
    initData()
})
</script>

<template>
    <div class="coding-state-wrap">
        <div id="title">
            <el-icon class="bx bx-time-five"/> Recent Dev Actions
        </div>
        <div class="coding-details">
            <div class="coding-detail" v-for="item in codingDetails">
                <div class="placeholder">
                    <div class="language">
                        {{item.language}}
                    </div>
                </div>
                <div class="code-box-wrap">
                    <div class="fill" :style="`width: ${item.percentage}%`">
                        {{item.coding_time}}
                    </div>
                </div>
                <div class="percentage-wrap">
                    {{item.percentage}}%
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#title{
    color: var(--var-c-text-cover);
    font-weight: bold;
    font-size: 26px;
    display: flex;
    align-items: center;
}
.coding-state-wrap{
    height: 200px;
    padding: 20px;
}
.coding-detail{
    display: flex;
    align-items: center;
}
.code-box-wrap{
    border: var(--var-card-color-border) 1px solid;
    height: 20px;
    width: 65%;
    border-radius: 4px
}
.percentage-wrap{
    width: 10%;
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-left: 5px;
    color: var(--var-c-text-cover);
}
.fill{
    border-radius: 4px;
    background: var(--var-c-hover-text);
    color: var(--var-c-text-cover);
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    /* 主要防止换行设置 */
    white-space: nowrap;
    overflow: visible;
    transition: width 0.4s ease-in-out, background-color ease-in-out 0.4s;
}
.placeholder{
    width: 25%;
    height: 26px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.language{
    font-weight: bold;
    font-size: 16px;
    color: var(--var-c-text-cover);
    display: flex;
    flex-wrap: nowrap;
}
@media (min-width: 500px) {
    .coding-state-wrap{
        width: 400px;
    }
}
@media (max-width: 500px) {
    .coding-state-wrap{
        width: 96vw;
    }
}
</style>