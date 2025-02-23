import type {ApiResponseData} from "@/api/response";
import type {Page} from "@/api/page";

export interface ActivityBrief {
    createCount: string
    updateCount: string
    deleteCount: string
    activityDate: string
}
export interface Activity {
    pid: string
    title: string
    activityType: string
    activityTime: string
    cover: string
}

export type ActivityData = ApiResponseData<Activity[]>
export type ActivityBriefRequestData = ApiResponseData<ActivityBrief[]>
export type ActivityPageData = ApiResponseData<Page<Activity>>