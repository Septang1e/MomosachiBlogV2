import type {LoginForm} from "@/api/user/types/user"
import {request} from "@/utils/request";
import type {ApiResponseData} from "@/api/response";
import {API_VERSION} from "@/constant/app-constant";

export function applyForAuth(loginData: LoginForm) {
    return request<ApiResponseData<string>>({
        url: `/api/${API_VERSION}/auth`,
        method: 'POST',
        data: loginData
    })
}

export function checkPermissionsForBackend() {
    return request<ApiResponseData<string>>({
        url: `/api/${API_VERSION}/auth/verify`,
        method: "POST"
    })
}