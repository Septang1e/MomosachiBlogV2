<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {format} from "date-fns";
const now = ref(new Date())
const currentTime = computed(()=>{
    return `${format(now.value.getTime(), "hh:mm a")}`
})

const process_dashoffset = ref((now.value.getSeconds() * 1000 + now.value.getMilliseconds()) / 60 / 1000)
function intervalHandler() {
    now.value = new Date()
    process_dashoffset.value = 314 * (1 - (now.value.getSeconds() * 1000 + now.value.getMilliseconds()) / 60 / 1000)
}

onMounted(()=>{
    setInterval(intervalHandler, 500)
})
const message = computed(()=>{
    const currentHours = now.value.getHours()
    if(currentHours <= 5 || currentHours >= 22) {
        return '夜深了...'
    }else if(currentHours < 12) {
        return '早上好鸭'
    }else if(currentHours <= 17) {
        return '下午好鸭'
    }else if(currentHours <= 19) {
        return '傍晚了...'
    }else{
        return '晚上好'
    }
})

</script>

<template>
    <div class="clock-card-wrap">
        <div class="upper-wrap">
            <div class="time-box">
                {{currentTime}}
                <svg class="process-ring">
                    <circle
                        class="progress-ring__circle"
                        stroke="var(--var-c-sub-text)"
                        stroke-width="5"
                        fill="transparent"
                        r="50"
                        cx="60"
                        cy="60"
                    />
                    <circle
                        class="progress-ring__circle"
                        stroke="var(--var-c-text-cover)"
                        :stroke-dashoffset="process_dashoffset"
                        stroke-width="5"
                        fill="transparent"
                        r="50"
                        cx="60"
                        cy="60"
                    />
                </svg>
            </div>
            <div class="message">
                {{message}}
            </div>
        </div>
        <div class="calender-datetime">
            <div>
                <el-icon class="bx bx-calendar"/> 现在是 {{now}}
            </div>
        </div>
    </div>
</template>

<style scoped>
.time-box::before{
    position: absolute;
    width: 100px;
    height: 100px;
}
.process-ring{
    content: "";
    position: absolute;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: rotate linear infinite 6s none;
}
.progress-ring__circle {
    stroke-dasharray: 314; /* 圆的周长 */
    transition: stroke-dashoffset ease 0.5s; /* 动画过渡 */
}
.time-box{
    color: var(--var-c-text-cover);
    display: flex;
    position: relative;
    align-items: center;
    height: 100px;
    width: 100px;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
}
.clock-card-wrap{
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
}
.upper-wrap{
    height: 100px;
    width: 100%;
    display: flex;
}
.message{
    color: var(--var-c-text-cover);
    font-weight: bold;
    font-size: 25px;
    width: calc(100% - 100px);
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
@media (min-width: 450px) {
    .clock-card-wrap {
        height: 200px;
        width: 300px;
    }
}
@media (max-width: 450px) {
    .clock-card-wrap {
        height: 200px;
        width: 96vw;
    }
}
.calender-datetime{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>