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

export function queryCommentBackendPage(commentQueryDTO: CommentQueryDTO, page_conf: PageConfig) {
    const params = new URLSearchParams()

    if (page_conf.strategy) {
        params.append('strategy', page_conf.strategy);
    }
    if (page_conf.sort?.length) {
        params.append('sort', page_conf.sort.join(',')); // 数组转逗号分隔
    }

    // 处理查询条件参数
    if (commentQueryDTO.article_pid) {
        params.append('article_pid', commentQueryDTO.article_pid);
    }
    if (commentQueryDTO.parent_id) {
        params.append('parent_id', commentQueryDTO.parent_id);
    }

    return request<CommentResponsePage>({
        url: `/admin/api/${API_VERSION}/comment/pagination/${page_conf.current}/${page_conf.size}?${params}`,
        method: 'GET'
    })

}

export function toggleCommentLike(commentId: string) {
    return request<ApiResponseData<string>>({
        url: `/api/${API_VERSION}/comment/like/${commentId}`,
        method: "POST"
    })
}

export function releaseComment(commentId: string) {
    return request<ApiResponseData<string>>({
        url: `/admin/api/${API_VERSION}/comment/release/${commentId}`,
        method: "POST"
    })
}

export function deactivateComment(commentId: string) {
    return request<ApiResponseData<string>>({
        url: `/admin/api/${API_VERSION}/comment/deactivate/${commentId}`,
        method: 'POST'
    })
}

export function deleteComment(comment: Comment) {
    return request<ApiResponseData<string>>({
        url: `/admin/api/${API_VERSION}/comment/`,
        method: 'DELETE',
        data: comment
    })
}