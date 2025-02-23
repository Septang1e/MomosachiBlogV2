<script lang="ts" setup>
import * as echarts from 'echarts';
import {onBeforeUnmount, onMounted, ref} from "vue";
import {queryArticleActivityInOneYear} from "@/api/activity";
import {useAppStore} from "@/stores";
import {useRouter} from "vue-router";
const now = new Date();
const end = +echarts.time.parse(+now);
const date = +echarts.time.parse(+new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()));
const appStore = useAppStore()

const router = useRouter()
type HeatmapData = [string, number, number, number, number];
const activityData = ref<HeatmapData[]>([])
interface FormatterParams {
    data: [string, number, number, number, number]; // 根据你的数据结构来调整类型
    seriesName: string;
    name: string;
    value: any;
}

let option : echarts.EChartsOption = {
    title: {
        top: 30,
        left: 'center'
    },
    tooltip: {
        formatter: function (params : any) {
            const [date, create, update, deleteCount, total] = params.data;
            if(total == 0) {
                return `no action on ${date}`
            }
            if(total == 1) {
                return `${total} action on ${date}`
            }
            return `${total} actions on ${date}`
        },
        textStyle: {
            fontWeight: 5,
            fontSize: 15
        }
    },
    legend: {},
    visualMap: {
        max: 6,
        min: 0,
        inRange:{
            color: ['#3E2723', '#BF360C', '#FF8A00', '#FFA726', '#FFECB3'],
            // color: ['#795548', '#FF7043', '#FFB74D', '#FFE082', '#FFF8E1'],
        },
        type: 'continuous', // piecewise
        orient: 'horizontal',
        left: 'center',
        top: 0,
        calculable: false,
    },
    calendar: {
        top: 50,
        left: 30,
        right: 30,
        cellSize: [13, 13],
        range: [date, end],
        itemStyle: {
            borderWidth: 2,
            borderRadius: 3,
            // borderColor: 'rgba(122,122,180,0.3)',
            // color: 'rgba(122,122,180,0.3)'
            borderColor: 'rgba(122,122,180,0)',
            color: 'rgba(122,122,180,0)'
            // borderColor: 'rgba(122,122,180,0.2)',  // 边框颜色略带透明感
            // color: 'rgba(255, 255, 255, 0.8)',  // 背景色为淡白色，带有透明感
        },
        splitLine: {
            show: false
        },
        yearLabel: { show: false },
        monthLabel: {
             color: 'white',
            // color: 'darkgrey'
        },
        dayLabel: {
             color: 'white'
            // color: 'darkgrey'
        }
    },
    series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: activityData.value
    }
}

// 绑定到 DOM 元素的引用
const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
const devicePixelRatio = ref(window.devicePixelRatio)
const totalActions = ref(0)

function heatMapItemClickHandler(params : echarts.ECElementEvent) {
    const data = params.data as HeatmapData
    if(data) {
        const date = data[0]
        router.push({
            path: '/archive',
            query: {
                day: date
            }
        })
    }
}

// 在组件挂载时初始化图表
onMounted(() => {

    queryArticleActivityInOneYear().then((res)=>{
        const data = res.data

        // 用于去重
        const st = new Set<Number>

        for(let i in data) {
            const create_count = Number(data[i].createCount)
            const update_count = Number(data[i].updateCount)
            const delete_count = Number(data[i].deleteCount)
            const total = create_count + update_count + delete_count

            activityData.value.push([
                echarts.time.format(data[i].activityDate, '{yyyy}-{MM}-{dd}', false),
                create_count,
                update_count,
                delete_count,
                total
            ])
            st.add(Number(data[i].activityDate))
            totalActions.value += total
        }

        const dayTime = 3600 * 24 * 1000
        for(let day = date; day <= end; day += dayTime) {
            if(!st.has(day)) {
                activityData.value.push([
                    echarts.time.format(day, '{yyyy}-{MM}-{dd}', false),
                    0,
                    0,
                    0,
                    0
                ])
            }
        }



    }).finally(()=>{
        if (chartRef.value) {


            // 移动设备解决方法
            if(appStore.isMobile()) {
                chartInstance = echarts.init(chartRef.value, null, {
                    renderer: 'canvas',
                    devicePixelRatio: 3,
                });
            }else{
                chartInstance = echarts.init(chartRef.value, null, {
                    renderer: 'svg',
                });
            }
            chartInstance.setOption(option)
            chartInstance.on('click', heatMapItemClickHandler)
        }
    })

    addEventListener('resize', resizeOperationHandler)
});
// 在组件卸载前销毁图表实例
onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.dispose();
    }
});
function resizeOperationHandler() {
    devicePixelRatio.value = window.devicePixelRatio
}
</script>

<template>
    <div class="action-header">
        <el-icon class="bx bx-compass"/> {{totalActions}} actions in the last year
    </div>
    <div class="action-body">
        <div ref="chartRef" class="heat-map"/>
    </div>
</template>

<style scoped>
.heat-map{
    width: 700px;
    height: 150px;
    overflow-x: auto;
    overflow-y: clip;
}
.action-header{
    color: white;
    font-weight: bold;
    max-width: 86vw;
    display: flex;
    align-items: center;
    justify-content: center;
}
.action-body{
    overflow-x: auto;
    box-sizing: border-box;
    max-width: 86vw;
}
</style>