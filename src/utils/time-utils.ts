import {now} from "lodash-es";
import {reactive, ref} from "vue";
import {format, isDate} from "date-fns";
export interface BlogRunTime{
    day: Number,
    hour: Number,
    minute: Number,
    second: Number
}

export function getBlogRunTime(start_date : string) {
    const date = new Date(start_date)
    const result : BlogRunTime = reactive({
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
    })
    if(date) {
        const gap = ref(now() - date.getTime().valueOf())
        gap.value /= 1000
        result.second = Math.floor(gap.value % 60)
        gap.value /= 60
        result.minute = Math.floor(gap.value % 60)
        gap.value /= 60
        result.hour = Math.floor(gap.value % 24)
        gap.value /= 24
        result.day = Math.floor(gap.value)
    }
    return result
}
export function getDateTime(str : string | number) {
    return format(str, "yyyy-MM-dd HH:mm")
}
export function get() {
    
}