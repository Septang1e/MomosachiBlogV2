<script lang="ts" setup>
import Avatar from "@/assets/resource/avatar.jpg";
import {onMounted, reactive, ref} from "vue";
import {useAdminStore, useAppStore} from "@/stores";
import {openNewPage} from "@/utils/router-utils";

const adminStore = useAdminStore()
const appStore = useAppStore()
const steamDialogVisible = ref(false)

const blog_info = ref([
    {name: '文章',}
])
/**
 * 当窗口大小小于某某值时，打开网页，否则执行对应操作
 */
const strokeOffset = ref(314)
function showSteamDialog() {

    if(window.innerWidth < 780) {
        openNewPage(adminStore.getAdminInfo().social_media.steam.url)
        return
    }

    steamDialogVisible.value = true
}

function resizeEventListener() {
    if(window.innerWidth < 780) {
        steamDialogVisible.value = false
    }
}
const codingTimeDetails = reactive({
    text: '0h',
    percentage: 0.25
})

function initData() {
    setTimeout(()=>{
        const WakatimeStats = appStore.getWakatimeStats()
        const percentage = WakatimeStats.last_week.data.total_seconds / WakatimeStats.last_month.data.total_seconds
        codingTimeDetails.text = `${Math.floor(WakatimeStats.last_week.data.total_seconds / 3600)}h`
        strokeOffset.value = 314 - (314 * 0.75 * percentage)
    }, 100)
}

onMounted(()=>{
    addEventListener('resize', resizeEventListener)
    initData()
})

</script>

<template>
    <div class="identity-wrap">
        <el-avatar class="momosachi-avatar" :size="120" :src="Avatar"/>
        <div class="momosachi-name">Momosachi</div>
        <div class="description">
            {{'Ciallo～(∠・ω< )⌒☆'}}
        </div>
        <div class="media-wrap">
            <div class="media-item" @click="openNewPage(adminStore.getAdminInfo().social_media.github)">
                <el-icon class="bx bxl-github"/>
            </div>
            <div class="media-item" @click="openNewPage(adminStore.getAdminInfo().social_media.steam.url)">
                <el-icon class="bx bxl-steam"/>
            </div>
            <div class="media-item" @click="">
                <el-icon class="bx bxl-gmail"/>
            </div>
        </div>
        <div class="code-time-wrap">
            <div class="code-time-text">
                <el-icon class="bx bx-calendar"/>编码时间记录
            </div>
            <div class="last-week">
                <div class="time-usage">
                    {{codingTimeDetails.text}}
                </div>
                LastWeek
                <svg class="ring">
                    <circle
                        class="ring__circle"
                        stroke="var(--var-c-sub-text)"
                        stroke-width="5"
                        stroke-dashoffset="calc(314 * 0.25)"
                        fill="transparent"
                        stroke-dasharray="314"
                        r="50"
                        cx="60"
                        cy="60"
                    />
                    <circle
                        class="ring__circle"
                        stroke="var(--var-c-hover-text)"
                        stroke-width="5"
                        :stroke-dashoffset="strokeOffset"
                        fill="transparent"
                        stroke-dasharray="314"
                        r="50"
                        cx="60"
                        cy="60"
                    />
                </svg>
            </div>
            <div class="coding-stats">
                <a href="https://wakatime.com/@018b6c92-b77f-4631-b470-94d279f463c6"><img src="https://wakatime.com/badge/user/018b6c92-b77f-4631-b470-94d279f463c6.svg" alt="Total time coded since Oct 26 2023" /></a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.identity-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
}
.momosachi-avatar{
    border: 2px white solid;
    cursor: pointer;
    transition: transform ease-in-out 2s;
}
.momosachi-avatar:hover{
    border: 2px var(--var-c-hover-text) solid;
    transform: rotateZ(360deg);
}
.momosachi-name{
    font-weight: bold;
    font-size: 22px;
    padding: 5px;
    font-family: misans;
    color: var(--var-c-text-cover);
    cursor: pointer;
}
.description{
    font-size: 14px;
    color: var(--var-c-text-cover);
    opacity: 70%;
    cursor: pointer;
}
.description:hover{
    color: var(--var-c-hover-text);
    opacity: 100%;
    text-shadow: var(--var-c-hover-text) 0 0 5px;
}
.media-wrap{
    padding: 5px;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}
.media-item{
    font-size: 24px;
    cursor: pointer;
}
.media-item:hover{
    color: var(--var-c-hover-text);
}
.code-time-wrap{
    width: 100%;
}
.last-week{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 120px;
    color: var(--var-c-hover-text);
    font-weight: bold;
}
.time-usage{
    font-weight: bold;
    font-size: 18px;
}
.ring{
    position: absolute;
    content: "";
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotateZ(135deg);
}
.ring__circle{
    transition: stroke-dashoffset ease 0.5s; /* 动画过渡 */
}
.code-time-text{
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    text-shadow: var(--var-c-white-sub-text) 0 2px;
}
.total-code-time-text{
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
    text-shadow: var(--var-c-white-sub-text) 0 1px;
}
.datasource{
    color: var(--var-c-sub-text);
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}
.datasource:hover{
    color: var(--var-c-hover-text);
    text-shadow: var(--var-c-white-sub-text) 0 1px;
}
.coding-stats{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>