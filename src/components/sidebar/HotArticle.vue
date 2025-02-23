<script setup lang="ts">

import Divider from "@/components/sub/Divider.vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import cover from "@/assets/bg/ccc.jpg"
import {queryArticleRank} from "@/api/article";
import type {ArticleBrief} from "@/api/article/types/article";
import {useAppStore} from "@/stores";
// 限制在6个以内
const hot_articles = ref<ArticleBrief[]>([])
const appStore = useAppStore()

function queryHotArticleData() {
    queryArticleRank().then(res=>{
        hot_articles.value.length = 0
        res.data.map(item => {
            hot_articles.value.push(item)
        })
    })
}
const item_conf = reactive({
    on_focus: false,
    on_focus_item: ""
})
function onFocus(item: string) {
    item_conf.on_focus = true
    item_conf.on_focus_item = item
}
function onBlur() {
    item_conf.on_focus = false
    item_conf.on_focus_item = ""
}
const currentPid = ref<undefined | string>(undefined)

watch(()=>appStore.getCurrentArticlePid(), ()=>{
    currentPid.value = appStore.getCurrentArticlePid()
})

onMounted(()=>{
    queryHotArticleData()
})

</script>

<template>
    <div class="hot-article-card">
        <div class="title-wrap">
            <div id="title"><el-icon class="bx bxs-hot"/>Hot Articles</div>
        </div>
        <div class="hot-article-wrap">
            <router-link :to="`/article/${item.pid}`" v-for="item in hot_articles"
                         class="hot-article-sub-card"

                         :class=" item_conf.on_focus && item_conf.on_focus_item != item.pid ? 'on-blur' : '' "

                         @mousemove="onFocus(item.pid)"
                         @mouseleave="onBlur">
                <div class="article-sub-cover">
                    <el-image :src="cover" fit="cover" style="height: 70px; width: 70px; border-radius: 8px"/>
                </div>
                <div class="article-info">
                    <div class="title">
                        {{item.title}}
                    </div>
                    <div class="heat-rate">
                        <el-icon class="bx bxs-hot"/>
                        {{item.heat}}
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style scoped>

.on-blur{
    filter: blur(5px);
}

.hot-article-card{
    width: 260px;
    height: fit-content;
    overflow: hidden;
    background-color: var(--var-c-bg-main);
    transition: background ease-in-out 0.3s, box-shadow ease-in-out 0.3s, border ease-in-out 0.3s;
    border-radius: 8px;
    padding: 20px;
    min-height: 300px;
    color: var(--var-c-text);
}
.title-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#title{
    font-weight: bold;
    font-size: var(--var-c-card-title-font-size);
    cursor: pointer;
    transition: color ease-in-out 0.3s;
}
.hot-article-wrap{
    color: var(--var-c-sub-text);
    max-height: 100%;
}
.title{
    font-size: var(--var-c-card-item-font-size);
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    height: 55px;
    width: 150px;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding: 5px;
    text-overflow: ellipsis;
}
.hot-article-sub-card{
    height: 80px;
    margin-bottom: 14px;
    overflow: clip;
    display: flex;
    flex-direction: row;
    color: var(--var-c-text);
    transition: scale ease-in-out 0.5s, color ease-in-out 0.4s, filter ease-in-out 0.6s, text-shadow ease-in-out 0.6s;
}
.hot-article-sub-card:hover{
    scale: 1.05;
    cursor: pointer;
    color: var(--var-c-hover-text);
}
.is_current *{
    color: var(--var-c-hover-text) !important;
}
.article-sub-cover{
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.article-info{
    display: flex;
    flex-direction: column;
}
.heat-rate{
    padding: 5px;
    max-height: 25px;
    display: flex;
    align-items: center;
    justify-content: end;
}
</style>