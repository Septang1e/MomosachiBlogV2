<script setup lang="ts">

import {reactive, ref} from "vue";
import type {Ref} from "vue"
import {openNewPage} from "@/utils/router-utils";
import {useAdminStore} from "@/stores";
import type {BlogRunTime} from "@/utils/time-utils";
import {getBlogRunTime, getDateTime} from "@/utils/time-utils";
import {now} from "lodash-es";
const adminStore = useAdminStore()
const blogRunTime : Ref<BlogRunTime> = ref(getBlogRunTime(adminStore.getAdminInfo().startDate))
setInterval(()=>{
    blogRunTime.value = getBlogRunTime(adminStore.getAdminInfo().startDate)
}, 1000)


</script>

<template>
    <div class="blog-runtime">
        网站已经运行了
        <div class="time-text">
            {{blogRunTime.day}}
        </div>
        天
        <div class="time-text">
            {{blogRunTime.hour}}
        </div>
        小时
        <div class="time-text">
            {{blogRunTime.minute}}
        </div>
        分钟
        <div class="time-text">
            {{blogRunTime.second}}
        </div>
        秒
    </div>
    <div class="copyright-text">
        Copyright © 2024 Septangle
    </div>
    <div class="icp filings-text" @click="openNewPage(adminStore.getAdminInfo().icp[1])">
        {{adminStore.getAdminInfo().icp[0]}}
    </div>
</template>

<style scoped>
    .blog-runtime{
        display: flex;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: "楷体", serif;
    }
    .time-text{
        padding: 0 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--var-c-hover-text);
        transition: color ease-in-out 0.3s;
        text-shadow: var(--var-c-hover-text) 0 0 5px;
        font-size: 12px;
    }
    .filings-text{
        font-size: 10px;
        align-items: center;
        margin-top: 3px;
        width: fit-content;
        display: flex;
        cursor: pointer;
        font-family: "楷体", serif;
        font-weight: bold;
    }
    .filings-text:hover{
        color: var(--var-c-hover-text);
        transition: color ease-in-out 0.3s;
        text-shadow: var(--var-c-hover-text) 0 0 5px;
        font-weight: bold;
    }
    .copyright-text{
        font-size: 10px;
        width: fit-content;
        align-items: center;
        font-weight: bold;
        cursor: pointer;
    }
</style>