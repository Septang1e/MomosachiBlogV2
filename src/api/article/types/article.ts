import type {Tag} from "@/api/tag/types/tag";
import type {Category} from "@/api/category/types/category";
import type {Page} from "@/api/page";
import type {ApiResponseData} from "@/api/response";

export interface Article{
    pid: string,
    title: string,
    content: string,
    cover: string,
    viewCount: number,
    likeCount: number,
    heat: number,
    setTop: number,
    state: number,
    createTime: string,
    updateTime: string,
    description: string
}
export interface ArticleBrief {
    pid: string,
    title: string,
    cover: string,
    heat: number
}
export interface ArticleAggregates {
    article: Article,
    tags: Tag[],
    category: Category
}


export type ArticlePage = ApiResponseData<Page<ArticleAggregates>>
export type HotArticleResponse = ApiResponseData<ArticleBrief[]>
export type ArticleResponse = ApiResponseData<ArticleAggregates>
export type ArticleLikeResponse = ApiResponseData<string>
export type ArticleSearchKeywordResponse = ApiResponseData<string[]>