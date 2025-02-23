import type {ApiResponseData} from "@/api/response";

export interface Category{
    pid: string,
    name: string,
    state: number,
    articleCount: number,
}

export type CategoryResponse = ApiResponseData<Category[]>