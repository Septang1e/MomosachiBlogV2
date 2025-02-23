import type {ComputedRef} from "vue";

export interface Page<T> {
    current: number,
    size: number,
    total: number,
    records: T[]
}
export interface PageConfig {
    current: number
    size: number
    strategy: string
    sort: string[]
    total: number
}