import {request} from "@/utils/request";
import type {CategoryResponse} from "@/api/category/types/category";
import {API_VERSION} from "@/constant/app-constant";

export function queryCategoryPage(current: number, size: number) {
    return request<CategoryResponse>({
        url: `/api/${API_VERSION}/category/pagination/${current}/${size}`,
        method: 'get'
    })
}