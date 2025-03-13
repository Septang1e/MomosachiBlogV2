<script setup lang="ts">
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {now} from "lodash-es";
import ProgressBar from "@/components/ProgressBar.vue";
import {getDateTime} from "@/utils/time-utils";
import {cancelThumbUp, queryArticle, queryArticlePage, thumbUp} from "@/api/article";

import type {Article, ArticleAggregates} from "@/api/article/types/article";
import {useRoute, useRouter} from "vue-router";
import MarkdownRenderer from "@/components/sub/MarkdownRenderer.vue";
import HotArticle from "@/components/sidebar/HotArticle.vue";
const tag_box_items = reactive([
    {name: '算法', style_id : 0},
    {name: '算法', style_id : 0}
])

const route = useRoute()
const appStore = useAppStore()
const router = useRouter()

const side_bar_visibility = ref(true)
const content_min_height = ref("min-height: max(calc(100vh - min(75px, 15vh)), 300px);")
const articleData = ref<ArticleAggregates>({
    article: {
        pid: "",
        title: "",
        content: "",
        cover: "",
        viewCount: 0,
        likeCount: 0,
        heat: 0,
        setTop: 0,
        state: 0,
        createTime: "",
        updateTime: "",
        description: "",
    },
    tags: [],
    category: {
        pid: "",
        name: "",
        state: 0,
        articleCount: 0,
    },
})
const likeState = ref(false)
const articlePid = ref("")

watch(()=>route.fullPath, queryArticleData)
function queryArticleData() {
    console.log(route.params['id'])
    queryArticle(<string>route.params['id']).then(res => {
        articleData.value = res.data
        md_state.text = res.data.article.content
        likeState.value = getCurrentLikeState(articleData.value.article.pid)
        appStore.setArticlePid(articleData.value.article.pid)
    }).catch(()=>{
        router.push("/error")
    })
}

function resizeEventListener() {
    const mainWrap = document.getElementById('main-wrap')
    const cover = document.querySelector('.cover')
    const copyright = document.querySelector('.copyright')


    side_bar_visibility.value = 1050 + 320 < window.innerWidth
}
function scrollEventListener() {
    sideBarMovementHandler()
}

//  MdEditor
import 'md-editor-v3/lib/style.css';
import MdEditorCatalog from "@/components/sub/MdEditorCatalog.vue";
import {useAppStore} from "@/stores";
import {getCurrentLikeState, setLikeState} from "@/utils/local-storage";
import {ArticleLikeState, ResponseCode} from "@/constant/app-key";
import {ElMessage, ElMessageBox} from "element-plus";
import CommentCard from "@/components/card/comment/CommentCard.vue";

const md_state = reactive({
    text: articleData.value.article.content,
    id: 'preview-only',
    theme: 'default',
})

// SideBar Movement Handler
const sideBarClass = ref("")
function sideBarMovementHandler() {
    // height that lower than header
    const offset = 20

    // elements
    const sideBar = document.querySelector('.side-bar')
    const sideBarCardSet = document.querySelector('.side-bar-card-set')
    const header = document.querySelector('.header-box')
    if(sideBar && sideBarCardSet && header) {
        // header的高度
        const headerHeight = header.getBoundingClientRect().height
        // header是否可见、向上滑动时可见
        const headerVisibility = appStore.headerVisible()
        // 文章、content-wrap中文章的高度
        const maxHeight = sideBar.getBoundingClientRect().height
        // 侧边栏的高度
        const sideBarHeight = sideBarCardSet.getBoundingClientRect().height
        cardSetHeight.value = sideBarCardSet.getBoundingClientRect().height
        // 侧边栏上方Y值和当前Y值的差
        const sideBarUpperYOffset = sideBar.getBoundingClientRect().y
        // 当 Y - 侧边栏高度 和 偏移量 < 0 时
        if(sideBarUpperYOffset <= offset + headerHeight && sideBarHeight - sideBarUpperYOffset + offset + headerHeight <= maxHeight) {
            sideBarClass.value = headerVisibility ?
                `position: fixed; top: ${offset}px;`
                : `position: fixed; top: ${headerHeight + offset}px;`
        }else if(sideBarHeight - sideBarUpperYOffset + offset + headerHeight >= maxHeight) {
            sideBarClass.value = 'position: absolute; bottom: 0'
        }else{
            sideBarClass.value = ""
        }
    }
}

function likeButtonClickEvent() {
    const pid = articleData.value.article.pid
    if(likeState.value){
        cancelThumbUp(pid).then((res)=>{
            switch (res.code) {
                case ResponseCode.SUCCESS:
                    articleData.value.article.likeCount = Number(articleData.value.article.likeCount) - 1
                    setLikeState(pid, ArticleLikeState.NOT_LIKE)
                    likeState.value = false
                    break
                case ResponseCode.DUPLICATE_OPERATION:
                    setLikeState(pid, ArticleLikeState.IS_LIKED)
                    likeState.value = false
                    ElMessage.error("数据有点不同步啦，当前IP已经取消过点赞了喵")
            }
        })
    }else{
        thumbUp(pid).then((res)=>{
            switch (res.code) {
                case ResponseCode.SUCCESS:
                    articleData.value.article.likeCount = Number(articleData.value.article.likeCount) + 1
                    setLikeState(pid, ArticleLikeState.IS_LIKED)
                    likeState.value = true
                    ElMessage.success("感谢点赞喵~")
                    break
                case ResponseCode.DUPLICATE_OPERATION:
                    setLikeState(pid, ArticleLikeState.NOT_LIKE)
                    likeState.value = true
                    ElMessage.error("你已经点过赞啦")

            }
        })
    }
}

const cardSetHeight = ref(0)

onMounted(()=>{
    queryArticleData()
    resizeEventListener()
    addEventListener('resize', resizeEventListener)
    addEventListener('scroll', scrollEventListener)

})
onUnmounted(()=>{
    removeEventListener('resize', resizeEventListener)
    removeEventListener('scroll', scrollEventListener)
    appStore.clearArticlePid()
})

</script>

<template>
    <ProgressBar/>
    <div class="cover expand">
        <div id="title">
            {{articleData.article.title}}
        </div>
        <div class="about-info">
            <div class="view-count about-item">
                <el-icon class="bx bx-show"/>
                {{articleData.article.viewCount}}
            </div>
            <div class="like-count about-item">
                <el-icon class="bx bx-like"/>
                {{articleData.article.likeCount}}
            </div>
            <router-link :to="`/category/${articleData.category.pid}`" class="category about-item">
                <el-icon class="bx bx-category"/>
                {{articleData.category.name}}
            </router-link>
            <div class="tag-box">
                <router-link :to="`/tag/${item.pid}`" v-for="item in articleData.tags" class="tag-item">
                    <div class="tag-icon">#</div>
                    <div class="name">
                        {{item.name}}
                    </div>
                </router-link>
            </div>
        </div>
        <div class="time-info">
            <div class="time-text create-time">
                <el-icon class="bx bx-calendar"/>
                {{getDateTime(Number(articleData.article.updateTime))}}
            </div>
            <div class="time-text update-time">
                <el-icon class="bx bx-history"/>
                {{getDateTime(Number(articleData.article.updateTime))}}
            </div>
        </div>
    </div>
    <div class="content-wrap">
        <div class="main-wrap">
            <!-- 正文 -->
            <div class="article-content-container">
                <MarkdownRenderer
                    :editor-id="md_state.id"
                    :theme="md_state.theme"
                    :article="articleData.article.content"/>
                <div class="article-details-wrap">
                    <div class="like-button" @click="likeButtonClickEvent" :class="likeState ? 'is_liked' : 'unlike'">
                        <el-icon size="default" :class="likeState ? 'bx bxs-like' : 'bx bx-like'"/>
                        <div class="like-details unselectable">
                            赞 {{articleData.article.likeCount}}
                        </div>
                    </div>
                </div>
            </div>
            <!-- 其余信息 -->
            <CommentCard
                :key="route.fullPath"
                :article-pid="<string>route.params['id']"
            />
        </div>
        <div class="side-bar" v-if="side_bar_visibility" :style="`min-height: ${cardSetHeight}px`">
            <div class="side-bar-card-set" :style="sideBarClass">
                <MdEditorCatalog style="box-shadow: var(--var-card-box-shadow);margin-bottom: 30px" editor-id="preview-only"/>
                <HotArticle style="box-shadow: var(--var-card-box-shadow);"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
a{
    color: white;
}
.side-bar{
    width: 300px;
    padding: 0 20px 20px 20px;
    position: relative;
    height: 100%;
}
.side-bar-card-set{
    transition: top ease-in-out 0.4s, bottom ease-in-out 0.4s;
}

.tag-icon{
    font-weight: bold;
    font-size: 1.5em;
}
.about-item{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    font-weight: bold;
    text-shadow: rgba(77, 77, 77) 1px 1px;
}
.about-info{
    display: flex;
    flex-direction: row;
    color: white;
    font-weight: bold;
    align-items: center;
}
.view-count{
    margin: 0 2px;
}
.tag-item{
    display: flex;
    margin: 0 2px;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    text-shadow: rgba(77, 77, 77) 1px 1px;
}
.name{
    font-weight: bold;
}
.tag-item:hover{
    color: var(--var-c-hover-text);
    text-shadow: var(--var-c-hover-text) 0 0 25px;
}
.tag-box{
    display: flex;
    justify-content: center;
}
.category{
    display: flex;
    align-items: center;
    justify-content: center;
}
.category:hover{
    color: var(--var-c-hover-text);
    text-shadow: var(--var-c-hover-text) 0 0 25px;
}
#title{
    color: white;
    font-weight: bold;
    font-size: 40px;
    cursor: pointer;
}
.cover{
    /**
     *  full cover
     */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.expand{
    height: 35vh;
    width: 100%;
    min-height: 300px;
}
.content-wrap{
    background-color: var(--var-c-bg-secondary);
    justify-content: center;
    transition: background ease-in-out 0.3s, box-shadow ease-in-out 0.3s, border ease-in-out 0.3s;
    display: flex;
    min-height: 65vh;
    padding: 40px 15px;
}
.article-content-container{
    display: flex;
    background-color: var(--var-c-bg-main);
    color: var(--var-c-text);
    height: fit-content;
    border-radius: 8px;
    box-shadow: var(--var-card-box-shadow);
    transition: background-color ease 0.3s;
    flex-direction: column;
}
.article-details-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
.like-button{
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 65px;
    height: 35px;
    padding: 10px;
    color: white;
    border-radius: 20px;
    cursor: pointer;
}
.is_liked{
    background-color: var(--var-button-isliked-bg);
}
.unlike{
    background-color: var(--var-button-bg);
}
.like-details{
    font-size: 12px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.main-wrap{
    display: flex;
    flex-direction: column;
    transition: width ease-in-out 0.4s,background ease-in-out 0.3s, box-shadow ease-in-out 0.3s, border ease-in-out 0.3s;;
}
@media (min-width: 1000px) {
    .main-wrap{
        width: 96%;
        max-width: 960px;
    }
}
@media (max-width: 1000px) {
    .main-wrap{
        width: 100%;
        max-width: 96vw;
    }
    .content-wrap{
        max-width: 100vw;
    }
}
.time-info{
    display: flex;
}
.time-text{
    padding: 0 5px;
    display: flex;
    color: white;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    text-shadow: rgba(77, 77, 77) 1px 1px;
}


</style>