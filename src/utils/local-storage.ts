import CacheKey from "@/constant/cache-key";
import {ArticleLikeState} from "@/constant/app-key";

export function setToken(token: string) {
    localStorage.setItem(CacheKey.TOKEN, token)
}
export function getToken() {
    return localStorage.getItem(CacheKey.TOKEN)
}
export function setTheme(theme: string) {
    localStorage.setItem(CacheKey.THEME, theme)
}
export function getCurrentTheme() {
    return localStorage.getItem(CacheKey.THEME)
}
export function getCurrentLikeState(articlePid : string) {
    const key = `${CacheKey.ARTICLE_THUMB_UP_STATE}-${articlePid}`
    return localStorage.getItem(key) === ArticleLikeState.IS_LIKED
}
export function setLikeState(articlePid : string, likeState : string) {
    const key = `${CacheKey.ARTICLE_THUMB_UP_STATE}-${articlePid}`
    localStorage.setItem(key, likeState)
}