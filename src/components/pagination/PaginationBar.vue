<script lang="ts" setup>

import {computed, onBeforeUnmount, onMounted, onUnmounted, reactive, ref, watch} from "vue";

const props = defineProps<{
    current : number,
    size : number,
    total : number
}>()
const emits = defineEmits<{
    (event: 'currentChange', current: number) : void;
}>()

const page_count = computed(()=>{
    const size = props.size
    const total = props.total
    if(size && total) {
        return Math.ceil(total / size)
    }
    return 0
})
const page_conf = reactive({
    current: props.current,
    size: props.size,
    total: props.total
})

const pager_count = 3


// 1 .. l current r n
//
const page_number_group = ref([3, 4, 5])
function pageNumberGroupInit() {
    let l = 1
    let r = 1
    // sz = l + r + 1
    let sz = Math.floor(pager_count / 2)
    const current = page_conf.current
    page_number_group.value = []
    if(!current) return
    while(current - l > 0 && l <= sz) {
        page_number_group.value.push(current - l)
        l++
    }
    page_number_group.value.push(current)
    while(current + r <= page_count.value && r <= sz) {
        page_number_group.value.push(current + r)
        r++
    }
    while(l <= sz && current + r <= page_count.value) {
        page_number_group.value.push(current + r)
        r++
        l++
    }
    while(r <= sz && current - l > 0) {
        page_number_group.value.push(current - l)
        ++r
        ++l
    }

    page_number_group.value.sort((a, b)=> a - b)
}
function currentChange(current : number) {
    // illegal current
    if(current === page_conf.current
        || current < 1 || current > page_count.value
    ) return
    page_conf.current = current
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    emits('currentChange', current)
}
// starting of the function of
const expand = ref(window.innerWidth > 400)
function onResize() {
    expand.value = window.innerWidth > 400
}

watch(()=> props.total, ()=>{
    page_conf.current = props.current
    page_conf.size = props.size
    page_conf.total = props.total
    pageNumberGroupInit()
})

onMounted(()=>{
    addEventListener('resize', onResize)
})
onBeforeUnmount(()=>{
    removeEventListener('resize', onResize)
})

</script>

<template>
    <div class="pagination-bar-wrap" v-if="page_count > 1">
        <div class="prev btn"
             v-if="page_conf.current > 1" @click="currentChange(page_conf.current - 1)"
             :class="!expand ? 'expand' : ''"
             :style="!expand && page_conf.current === page_count ? 'width: 90%' : ''"
        >
            <el-icon class="bx bx-chevron-left"/>
        </div>
        <div class="page-number-wrap" v-if="expand">
            <div class="btn page-number" v-if="page_number_group[0] != 1" @click="currentChange(1)">
                1
            </div>
            <div class="btn page-number" v-if="page_number_group[0] > 2">
                ···
            </div>
            <div class="btn page-number" v-for="item in page_number_group" :class="page_conf.current === item ? 'current' : ''" @click="currentChange(item)">
                {{item}}
            </div>
            <div class="btn page-number" v-if="page_number_group[pager_count - 1] < page_count - 1">
                ···
            </div>
            <div class="btn page-number" v-if="page_number_group[pager_count - 1] < page_count" @click="currentChange(page_count)">
                {{page_count}}
            </div>
        </div>
        <div class="next btn"
             :class="!expand ? 'expand' : ''"
             v-if="page_conf.current < page_count" @click="currentChange(page_conf.current + 1)"
             :style="!expand && page_conf.current === 1 ? 'width: 90%' : ''"
        >
            <el-icon class="bx bx-chevron-right"/>
        </div>
    </div>
</template>

<style scoped>
.pagination-bar-wrap{
    height: 30px;
    font-size: 25px;
    color: var(--var-c-text);
    max-width: 96vw;
    display: flex;
}
.btn{
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius: 10px;
    width: 30px;
    transition: color ease-in-out 0.3s;
    margin: 0 5px;
    background: var(--var-c-bg-main);
    box-shadow: var(--var-card-box-shadow);
}
.page-number-wrap{
    display: flex;
}
.btn:hover{
    cursor: pointer;
    color: var(--var-c-hover-text);
}
.page-number{
    font-size: 15px;
    align-items: center;
    justify-content: center;
}
.current{
    background: var(--var-c-hover-text);
    color: white !important;
}
.expand{
    width: 45%;
}
</style>