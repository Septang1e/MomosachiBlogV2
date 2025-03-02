import type {User} from "@/api/user/types/user";

export interface Comment {
    pid: string,
    content: string,
    createTime: number,
    updateTime: number,
    likes: number,
    user: User,
    parentId: string,
    replies: Comment[],
    status: number,
    replyTo: string
}