import {request} from "@/utils/request";
import type {
    ActivityBriefRequestData,
    ActivityData,
    ActivityPageData
} from "@/api/activity/types/activity";
import {API_VERSION} from "@/constant/app-constant";
import type {PageConfig} from "@/api/page";

export function queryArticleActivityInOneYear() {
    // date-format: yyyy-mm-dd
    return request<ActivityBriefRequestData>({
        url: `/api/${API_VERSION}/article/activity/last_year`,
        method: 'GET',
    })
}
export function queryArticleActivityPage(conf : PageConfig, year : string | undefined | null) {
    let params = ""
    if(year != undefined || year === null) {
        params = `?year=${year}`
    }
    return request<ActivityPageData>({
        url: `/api/${API_VERSION}/article/activity/${conf.current}/${conf.size}${params}`,
        method: 'GET'
    })
}
export function queryArticleActivityByDate(dateStr : string) {
    return request<ActivityData>({
        url: `/api/${API_VERSION}/article/activity/${dateStr}`,
        method: 'GET'
    })
}