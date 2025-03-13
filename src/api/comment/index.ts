import {request} from "@/utils/request";
import type {ApiResponseData} from "@/api/response";
import {API_VERSION} from "@/constant/app-constant";
import type {Comment, CommentQueryDTO, CommentResponsePage} from "@/api/comment/types/comment";
import type {PageConfig} from "@/api/page";


export function queryCommentPage(commentQueryDTO: CommentQueryDTO, page_conf: PageConfig) {
    const params = new URLSearchParams()
    const baseUrl = `/api/${API_VERSION}/comment/pagination/${page_conf.current}/${page_conf.size}`

    if(commentQueryDTO.article_pid != undefined) {
        params.set("article_pid", commentQueryDTO.article_pid)
    }

    if(commentQueryDTO.parent_id != undefined) {
        params.set("parent_id", commentQueryDTO.parent_id)
    }

    return request<CommentResponsePage>({
        url: `${baseUrl}?${params}`,
        method: 'GET'
    })

}

export function postComment(comment: Comment) {
    return request<ApiResponseData<string>>({
        url: `/api/${API_VERSION}/comment`,
        method: 'POST',
        data: comment
    })
}