<script lang="ts" setup>
import Header from "@/components/Header.vue";
import PaginationCard from "@/components/pagination/PaginationCard.vue";
import {computed, onMounted, onUnmounted, reactive, ref, watch} from "vue";
import HotArticle from "@/components/sidebar/HotArticle.vue";
import Category from "@/components/sidebar/Category.vue";
import PaginationBar from "@/components/pagination/PaginationBar.vue";
import type {PageConfig} from "@/api/page";
import {PaginationStrategy, SortType} from "@/constant/app-key";
import {queryArticlePage} from "@/api/article";
import {useRoute} from "vue-router";
import type {ArticleAggregates} from "@/api/article/types/article";
import {useAppStore} from "@/stores";
import Cover from "@/components/Cover.vue";
import markdownIt from "@/utils/markdown-it";

function scrollToMainContent() {
    const content_wrap = document.querySelector('.cover')
    if(content_wrap) {
        scrollTo({
            top: content_wrap.scrollHeight + 50,
            behavior: 'smooth'
        })
    }
}

// Stores
const appStore = useAppStore()

function currentChange(current : number) {
    conf.current = current
    queryArticleData()
}
const route = useRoute()
const conf : PageConfig = reactive({
    current: 1,
    size: 5,
    strategy: <string>route.meta.strategy || PaginationStrategy.DEFAULT_STRATEGY,
    sort: [SortType.UPDATE_TIME_ASC],
    total: 0
})
const tag = ref<string | undefined>(undefined)
const category = ref<string | undefined>(undefined)
const keyword = ref<string | undefined>(undefined)
const articleData = ref<ArticleAggregates[]>([])
function queryArticleData() {
    queryArticlePage(conf, tag.value, category.value, keyword.value).then(res =>{
        conf.total = res.data.total
        const records = res.data.records
        articleData.value.length = 0
        records.map(item => {
            articleData.value.push(item)
        })
    })
}
function initPaginationConfig() {
    conf.current = 1
    conf.strategy = <string>route.meta.strategy || PaginationStrategy.DEFAULT_STRATEGY
    if(conf.strategy === PaginationStrategy.DEFAULT_STRATEGY && conf.sort.length <= 1) {
        conf.sort.push(SortType.TOP)
    }
    if(route.name === 'home_tag') {
        tag.value = <string>route.params['id']
    }
    else if(route.name === 'home_category') {
        category.value = <string>route.params['id']
    }
    else if(route.name === 'search_result') {
        keyword.value = <string>route.params['keyword']
    }
    console.log(conf)
}
watch(()=>route.fullPath, ()=>{
    initPaginationConfig()
    queryArticleData()
    conf.current = 1
})
onMounted(()=>{
    initPaginationConfig()
    queryArticleData()

})
onUnmounted(()=>{
})

</script>

<template>
    <div class="cover expand">
        <Cover/>
    </div>
    <div class="content-wrap">
        <div class="main-wrap">
            <div class="article-pagination">
                <div class="pagination-wrap">
                    <div class="article-item" v-for="item in articleData">
                        <PaginationCard
                            :strategy="conf.strategy"
                            :article="item"/>
                    </div>
                </div>
                <pagination-bar
                    :size='conf.size'
                    :current='conf.current'
                    :total='conf.total'
                    @current-change="currentChange"
                />
            </div>
            <div class="side-bar" v-if="appStore.sideBarVisible()">
                <hot-article style="box-shadow: var(--var-card-box-shadow)"/>
                <category style="margin-top: 30px; box-shadow: var(--var-card-box-shadow)"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

<style scoped>
.test{
    font-size: 24px;
    .text{
        font-size: 24px;
        color: white;
        flex-wrap: wrap;
    }
    .fake{
        color: transparent;
        -webkit-text-stroke: 2px skyblue;
        z-index: -1;
        position: absolute;
    }
}
.side-bar{
    width: 300px;
    height: fit-content;
    padding: 0 20px 20px;
    margin-left: 20px;
}
.cover{
    /**
     *  full cover
     */
    color: var(--var-c-text-cover);
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    justify-content: center;
    align-items: center;
    width: 96%;
}
.expand{
    height: calc(100vh - 50px);
    min-height: fit-content;
}
.content-wrap{
    min-height: max(calc(100vh - min(75px, 15vh)), 300px);
    background-color: var(--var-c-bg-secondary);
    transition: background ease-in-out 0.3s, box-shadow ease-in-out 0.3s, border ease-in-out 0.3s;
    justify-content: center;
    display: flex;
    padding: 40px 0;
}
.main-wrap{
    /**background-color: rgba(123,123,255, 0.1);*/
    border-radius: 8px;
    justify-content: center;
    display: flex;
    width: 96%;
    max-width: 1050px;
    height: fit-content;
}
.copyright {
    height: 75px;
    max-height: 15vh;
    background-color: var(--var-c-bg-main);
}

.article-pagination{
    width: 96%;
    display: flex;
    flex-direction: column;
}
@media (min-width: 768px) {
    .article-pagination{
        align-items: center;
    }
}
.pagination-wrap{
    width: 96%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 650px;
}
.article-item{
    margin-bottom: 30px;
}
</style>