import type {PageConfig} from "@/api/page";
import {request} from "@/utils/request";
import type {
    ArticleAggregates,
    ArticleLikeResponse,
    ArticlePage,
    ArticleResponse,
    ArticleSearchKeywordResponse,
    HotArticleResponse
} from "@/api/article/types/article";
import {ref} from "vue";
import {API_VERSION} from "@/constant/app-constant";
import type {ApiResponseData} from "@/api/response";


export function queryArticlePage(conf: PageConfig, tag: string | undefined, category: string | undefined, keyword: string | undefined) {
    const params = ref("?")
    const flag = ref(false)
    if(tag != undefined) {
        params.value = `${params.value}tag=${tag}`
        flag.value = true
    }
    if(category != undefined) {
        params.value = `${params.value}${flag.value ? '&' : ''}category=${category}`
        flag.value = true
    }
    if(keyword != undefined) {
        params.value = `${params.value}${flag.value ? '&' : ''}keyword=${keyword}`
        flag.value = true
    }
    if(conf.strategy != undefined) {
        params.value = `${params.value}${flag.value ? '&' : ''}strategy=${conf.strategy}`
        flag.value = true
    }
    if(conf.sort != undefined) {
        params.value = `${params.value}${flag.value ? '&' : ''}sort=`

        for(let i in conf.sort) {
            params.value = `${params.value}${conf.sort[i]}`
            if(Number(i) != conf.sort.length - 1) {
                params.value = `${params.value},`
            }
        }
    }

    return request<ArticlePage>({
        url: `/api/${API_VERSION}/article/pagination/${conf.current}/${conf.size}${params.value}`,
        method: 'get',
    })
}

export function queryArticle(pid : string) {
    return request<ArticleResponse>({
        url: `/api/${API_VERSION}/article/${pid}`,
        method: 'post'
    })
}

export function queryArticleRank() {
    return request<HotArticleResponse>({
        url: `/api/${API_VERSION}/article/rank`,
        method: "get"
    })
}

export function thumbUp(pid : string) {
    return request<ArticleLikeResponse>({
        url: `/api/${API_VERSION}/article/like/${pid}`,
        method: 'post'
    })
}

export function cancelThumbUp(pid: string) {
    return request<ArticleLikeResponse>({
        url: `/api/${API_VERSION}/article/unlike/${pid}`,
        method: 'post'
    })
}

export function autocompleteArticleSearchKeyword(keyword: string) {
    return request<ArticleSearchKeywordResponse>({
        url: `/api/${API_VERSION}/article/autocomplete/${keyword}`,
        method: 'post'
    })
}
export function createArticle(articleAggregates: ArticleAggregates) {
    return request<ApiResponseData<string>>({
        url: `/api/${API_VERSION}/article`,
        method: 'post',
        data: articleAggregates
    })
}

export function queryArticleBackendPage() {

}