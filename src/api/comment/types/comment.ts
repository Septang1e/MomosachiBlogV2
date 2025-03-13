import type {User} from "@/api/user/types/user";
import type {Page} from "@/api/page";
import type {ApiResponseData} from "@/api/response";

export interface Comment {
    commentId: string,
    content: string,
    parentId: string,
    replyTo: string
    createTime: number,
    updateTime: number,
    articlePid: string,
    likes: number,
    user: User,
    state: number,
}

export interface CommentQueryDTO {
    article_pid: string | undefined,
    parent_id: string | undefined
}

export type CommentResponsePage = ApiResponseData<Page<Comment>>