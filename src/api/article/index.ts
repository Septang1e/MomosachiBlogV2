import type {PageConfig} from "@/api/page";
import {request} from "@/utils/request";
import type {
    ArticleAggregates,
    ArticleLikeResponse,
    ArticlePage,
    ArticlePageQueryDTO,
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
        url: `/admin/api/${API_VERSION}/article/`,
        method: 'post',
        data: articleAggregates
    })
}

export function updateArticle(article: ArticleAggregates) {
    article.article.createTime = ''
    article.article.updateTime = ''
    return request<ApiResponseData<string>>({
        url: `/admin/api/${API_VERSION}/article/`,
        method: "PUT",
        data: article
    })
}

export function deleteArticle(article: ArticleAggregates) {
    article.article.createTime = ''
    article.article.updateTime = ''
    return request<ApiResponseData<string>>({
        url: `/admin/api/${API_VERSION}/article/`,
        method: 'DELETE',
        data: article
    })
}

export function queryArticleBackendPage(page_conf: PageConfig, query_dto : ArticlePageQueryDTO) {

    const params = new URLSearchParams()

    if (page_conf.strategy) {
        params.append('strategy', page_conf.strategy);
    }
    if (page_conf.sort?.length) {
        params.append('sort', page_conf.sort.join(',')); // 数组转逗号分隔
    }

    // 处理查询条件参数
    if (query_dto.tag) {
        params.append('tag', query_dto.tag);
    }
    if (query_dto.category) {
        params.append('category', query_dto.category);
    }
    if (query_dto.keyword) {
        params.append('keyword', query_dto.keyword);
    }

    return request<ArticlePage>({
        url: `/admin/api/${API_VERSION}/article/pagination/${page_conf.current}/${page_conf.size}?${params}`,
        method: 'GET'
    })
}