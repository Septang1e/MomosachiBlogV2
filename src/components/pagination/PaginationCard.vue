<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {getDateTime} from "@/utils/time-utils";
import {jumpTo} from "@/utils/router-utils";
import type {ArticleAggregates} from "@/api/article/types/article";
import {ArticleState, PaginationStrategy} from "@/constant/app-key";

const props = defineProps<{
    article: ArticleAggregates
    strategy: string
}>()
onMounted(()=>{
    props.article.tags.length = Math.min(props.article.tags.length, 2)
})


</script>

<template>
    <router-link :to="`/article/${article.article.pid}`" class="pagination-card">
        <div class="blur-background"></div>
        <div class="overhead"
             v-if="article.article.setTop === ArticleState.SET_TOP && strategy === PaginationStrategy.DEFAULT_STRATEGY"
        >顶置</div>
        <div class="pagination-content">
            <div id="title">
                {{article.article.title}}
            </div>
            <div class="about-wrap">
                <div class="view-count about-item">
                    <el-icon class="bx bx-show"/>
                    {{article.article.viewCount}}
                </div>
                <div class="like-count about-item">
                    <el-icon class="bx bx-like"/>
                    {{article.article.likeCount}}
                </div>
                <router-link :to='"/category/" + article.category.pid' class="category about-item">
                    <el-icon class="bx bx-category"/>
                    {{article.category.name}}
                </router-link>
                <div class="tag-box">
                    <router-link :to="'/tag/'+item.pid" v-for="item in article.tags" class="tag-item about-item">
                        <el-icon class="bx bx-purchase-tag"/>
                        {{item.name}}
                    </router-link>
                </div>
            </div>
            <div class="description">
                {{article.article.description}}
            </div>
            <div class="time-info">
                <div class="time-text create-time">
                    <el-icon class="bx bx-calendar"/>
                    {{getDateTime(article.article.createTime)}}
                </div>
                <div class="time-text update-time">
                    <el-icon class="bx bx-history"/>
                    {{getDateTime(article.article.updateTime)}}
                </div>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
.overhead{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 35px;
    height: 20px;
    background: rgb(240, 80, 80);
    display: flex;
    font-size: 11px;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 8px;
}
.pagination-card{
    height: 200px;
    padding: 20px;
    width: 100%;
    border-radius: 15px;
    background-size: cover;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all ease-in-out 0.4s;
    overflow: clip;
    box-shadow: var(--var-card-box-shadow);
}
.blur-background {
    z-index: 0;
    border-radius: 15px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("../../assets/bg/ccc.jpg") no-repeat;
    transition: filter ease-in-out 0.4s, scale ease-in-out 0.8s;
    background-size: cover;
    max-width: 100%;
    overflow: clip;
}
.pagination-card:hover {
    .blur-background{
        filter: blur(5px) brightness(50%);
        scale: 110%;
    };
    .pagination-content #title{
        color: var(--var-c-hover-text) !important;
        text-shadow: var(--var-c-hover-text) 0 0 5px, rgba(77, 77, 77) 1px 1px 20px;
    }
}
.pagination-content{
    z-index: 1;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#title{
    font-weight: bold;
    font-size: 30px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: white 0 0 5px, rgba(77, 77, 77) 1px 1px 20px;
}
.about-item{
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 5px;
    text-shadow: white 0 0 25px, rgba(77, 77, 77) 1px 1px;
    font-weight: bold;
}
.tag-item:hover{
    color: var(--var-c-hover-text);
    text-shadow: skyblue 0 0 25px;
    background-color: transparent;
}
.category:hover{
    color: var(--var-c-hover-text);
    text-shadow: skyblue 0 0 25px;
    background-color: transparent;
}
.about-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
}
.tag-box{
    display: flex;
}
.tag-item{
    font-size: 12px !important;
    z-index: 555;
    display: flex;
    justify-content: center;
    align-items: center;
}
.time-info{
    display: flex;
    justify-content: center;
}
.time-text{
    padding: 0 5px;
    display: flex;
    color: white;
    font-weight: bold;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    text-shadow: rgba(77, 77, 77) 1px 1px;
}
.description{
    justify-content: center;
    height: 0;
    white-space: nowrap;
    overflow: clip;
    color: white;;
    text-overflow: ellipsis;
    transition: height ease-in-out 0.5s, filter ease-in-out 0.7s;
    filter: blur(5px) opacity(0);
}
@media (max-width: 768px) {
    .description{
        max-width: 80vw;
    }
}
@media (min-width: 768px) {
    .description{
        max-width: 600px;
    }
}
.pagination-card:hover .description{
    height: 30px;
    filter: blur(0) opacity(100%);

}
</style>