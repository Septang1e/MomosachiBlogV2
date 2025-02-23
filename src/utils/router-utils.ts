import type {Router} from "vue-router";

export function jumpTo(uri : string) {
    window.location.assign(uri)
}
export function openNewPage(url : string) {
    window.open(url)
}