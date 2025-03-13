<script lang="ts" setup>
import Cover from "@/components/Cover.vue";
import {onMounted, reactive, ref, watch} from "vue";
import type {Activity} from "@/api/activity/types/activity";
import ArticleCover from "@/assets/bg/A.jpg"
import {useRoute} from "vue-router";
import {queryArticleActivityByDate, queryArticleActivityPage} from "@/api/activity";
import {format} from "date-fns";
import type {PageConfig} from "@/api/page";
import {ActivityType} from "@/constant/app-key";
import {useAppStore} from "@/stores";

const appStore = useAppStore()
const route = useRoute()

const articleActionsData = ref<TimelineItem[]>([])
const currentDate = ref("");

const pageConf : PageConfig = reactive({
    current: 1,
    size: 5,
    strategy: "",
    sort: [],
    total: 0,
})

const articleMessageMap : Map<String, String> = new Map([
    [ActivityType.DELETE, "删除于"],
    [ActivityType.CREATE, "创建于"],
    [ActivityType.UPDATE, "更新于"]
])

interface TimelineItem{
    date: string,
    activities: Activity[]
    visible: boolean
}
function queryActivityData() {
    const day = <string>route.query['day']
    const year = <string>route.query['year']

    if(day != null) {
        queryArticleActivityByDate(day).then((res)=>{
            let item : TimelineItem = {
                date: day,
                activities : [],
                visible: true
            }
            const data = res.data
            for(let i in data) {
                data[i].activityTime = format(data[i].activityTime, "yyyy-MM-dd hh:mm")
                item.activities.push(data[i])
            }
            articleActionsData.value.push(item)
        })
        return
    }

    queryArticleActivityPage(pageConf, year).then((res)=>{
        pageConf.total = res.data.total
        const records = res.data.records
        for(let i in records) {
            const activity = records[i]
            // 用于把某一天划分到一个Timeline里
            const date = format(activity.activityTime, "yyyy-MM-dd")
            activity.activityTime = format(activity.activityTime, "yyyy-MM-dd hh:mm")

            // 如果 上一条数据的日期 不等于 当前数据的时期
            if(currentDate.value != date) {
                let item : TimelineItem = {
                    date: date,
                    activities : [],
                    visible: true
                }
                item.activities.push(activity)
                articleActionsData.value.push(item)
                // 更新日期数据
                currentDate.value = date
                continue
            }
            articleActionsData.value[articleActionsData.value.length - 1].activities.push(activity)
        }
    })
}

watch(()=>route.fullPath, ()=> {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    currentDate.value = ""
    articleActionsData.value.length = 0
    queryActivityData()
})

onMounted(()=>{
    queryActivityData()
})

function verifyDateStr() {

}


</script>

<template>
    <div class="cover">
        <Cover/>
    </div>
    <div class="content-wrap">
        <div class="activity-listing-wrap">
            <div class="header-wrap">
                <router-link :to="'/archive'" class="title">
                    Article Activities
                </router-link>
                <div class="tool-box">
                    <el-icon class="bx bx-coffee"/>
                </div>
            </div>
            <div class="activity-listing-item">
                <div class="timeline-item" v-for="timelineItem in articleActionsData">
                    <div class="timeline-badge">
                        <div class="timeline-icon">
                            <el-icon class="bx bx-bulb"/>
                        </div>
                    </div>

                    <div class="timeline-body">
                        <div class="operation-time">
                            {{timelineItem.date}}
                        </div>
                        <div class="no-data-placeholder" v-if="
                            articleActionsData.length === 1 && articleActionsData[0].activities.length === 0 || articleActionsData.length === 0"
                        >
                            当天没有内容哦
                        </div>
                        <div class="article-body" v-for="activity in timelineItem.activities">
                            <el-image class="img" fit="cover" v-if="activity.cover != undefined && activity.cover != ''" :src="activity.cover"/>
                            <div class="article-description">
                                <div class="activity-message">
                                    {{activity.activityTime}}
                                    <el-tag type="danger" v-if="activity.activityType === ActivityType.DELETE"
                                            class="message-tag"
                                            :class="appStore.getCurrentTheme() === 'dark' ? 'el-tag--dark' : ''">
                                        删除
                                    </el-tag>
                                    <el-tag type="primary" v-else-if="activity.activityType === ActivityType.CREATE"
                                            class="message-tag"
                                            :class="appStore.getCurrentTheme() === 'dark' ? 'el-tag--dark' : ''">
                                        创建
                                    </el-tag>
                                    <el-tag type="success" v-else-if="activity.activityType === ActivityType.UPDATE"
                                            class="message-tag"
                                            :class="appStore.getCurrentTheme() === 'dark' ? 'el-tag--dark' : ''">
                                        更新
                                    </el-tag>
                                </div>
                                <router-link :to="`/article/${activity.pid}`" class="article-title" v-if="activity.activityType != ActivityType.DELETE">
                                    {{activity.title}}
                                </router-link>
                                <div class="article-title" v-else>
                                    {{activity.title}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cover{
    min-height: 50vh;
    color: var(--var-c-text-cover);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.content-wrap{
    background-color: var(--var-c-bg-secondary);
    justify-content: center;
    transition: background ease-in-out 0.3s, box-shadow ease-in-out 0.3s, border ease-in-out 0.3s;
    display: flex;
    min-height: 50vh;
    padding: 40px 15px;
}
.header-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
}
.title{
    font-size: 26px;
    color: var(--var-c-text);
    font-weight: bold;
    padding: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    cursor: pointer;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
.tool-box{
    color: var(--var-c-text);
}
.activity-listing-wrap{
    display: flex;
    flex-direction: column;
    transition: width ease-in-out 0.4s,background ease-in-out 0.3s, box-shadow ease-in-out 0.3s, border ease-in-out 0.3s, height ease-in-out 0.8s;
    padding: 20px;
    background-color: var(--var-c-bg-main);
    height: fit-content;
    border-radius: 12px;
    overflow: clip;
    position: relative;
}
@media (min-width: 1000px) {
    .activity-listing-wrap{
        width: 96%;
        max-width: 960px;
    }
}
@media (max-width: 1000px) {
    .activity-listing-wrap{
        width: 100%;
        max-width: 96vw;
    }
    .content-wrap{
        max-width: 100vw;
    }
}
.activity-listing-item{
    margin-top: 20px;
}
.timeline-item{
    margin-left: 12px;
    position: relative;
    display: flex;
}
.timeline-item::before{
    content: "";
    display: block;
    font-size: 14px;
    line-height: 21px;
    position: absolute;
    height: 100%;
    width: 2px;
    top: 0;
    left: 0;
    background-color: var(--var-c-hover-text);
}
.timeline-badge{
    min-width: 16px;
    position: relative;
}
.timeline-icon{
    position: absolute;
    width: 32px;
    height: 32px;
    display: flex;
    font-size: 22px;
    align-items: center;
    justify-content: center;
    background-color: var(--var-c-hover-text);
    color: var(--var-c-text);
    border-radius: 40px;
    top: 0;
    left: -15.5px;
}
.timeline-body{
    color: var(--var-c-sub-text);
    margin-left: 15px;
}
.operation-time{
    font-size: 16px;
    display: flex;
    align-items: center;
    font-weight: bold;
}
.article-body{
    display: flex;
    align-items: center;
    padding: 5px;
}
.article-description{
    margin-left: 5px;
}
.img{
    width: 60px;
    height: 60px;
    border-radius: 12px;
    overflow: clip;
}
.article-title{
    color: var(--var-c-text);
    font-weight: bold;
    font-size: 18px;
}
.article-title:hover{
    color: var(--var-c-hover-text);
}
.article-description{
    font-weight: bold;
}
.activity-message{
    display: flex;
    align-items: center;
    font-size: 16px;
}
.message-tag{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
}
</style>