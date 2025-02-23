<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {autocompleteArticleSearchKeyword} from "@/api/article";

const delIconVisible = ref(false)
const keyword = ref()
const autocompleteDataSet = ref<string[]>([
])
const router = useRouter()

function searchInputOnFocus() {
    delIconVisible.value = true
}
function searchInputOnBlur() {
    delIconVisible.value = false
}
const clearKeyword = () => {
    keyword.value = ""
}
const preventBlur = (event: Event) => {
    event.preventDefault(); // 阻止触发 blur 行为
}
const handleSearchKeydown = (event : KeyboardEvent) =>{
    if(event.key === 'Enter' && delIconVisible.value) {
        onSearch()
    }
    console.log(event)
}
const onSearch = () => {
    if(keyword.value.length === 0) return
    router.push(`/search?keyword=${keyword.value}`)
}
const fillAndSearch = (item : string) => {
    keyword.value = item
    onSearch()
}
const autocomplete = () => {
    autocompleteArticleSearchKeyword(keyword.value).then((res)=>{
        autocompleteDataSet.value = res.data
    })
}
watch(()=>keyword.value, ()=>{
    autocomplete()
})


</script>

<template>
    <div class="search-box-wrap">
        <div class="search-input-wrap">
            <input class="search-input"
                   @focus="searchInputOnFocus"
                   @blur="searchInputOnBlur"
                   @keydown="handleSearchKeydown"
                   v-model="keyword"/>
            <el-icon class="del-icon bx bx-x-circle"
                     @mousedown="preventBlur"
                     @click="clearKeyword"
                     v-if="delIconVisible && keyword.length > 0"/>
        </div>
        <el-icon class="search-icon bx bx-search"
                 @click="onSearch"
        />
        <div class="autocomplete-wrap"
             v-if="delIconVisible && autocompleteDataSet.length > 0"
             @mousedown="preventBlur"
        >
            <div class="autocomplete-item"
                 v-for="item in autocompleteDataSet"
                 @click="fillAndSearch(item)"
            >
                {{item}}
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-box-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--var-c-hover-bg);
    border-radius: 8px;
    color: var(--var-c-text);
    height: 36px;
    width: 180px;
    position: relative;
}
.search-input{
    height: 28px;
    width: 150px;
    border-radius: 6px;
    background-color: transparent;
    border: none;
    padding: 8px 25px 8px 8px;
    color: var(--var-c-text);
}
.search-input-wrap{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.search-input:focus{
    outline: none;
    background-color: var(--var-c-bg-main);
}
.search-icon{
    justify-content: center;
    cursor: pointer;
    display: flex;
    margin-left: 3px;
    align-items: center;
}
.search-icon:hover{
    color: var(--var-c-hover-text);
}
.del-icon{
    position: absolute;
    right: 6px;
    cursor: pointer;
}
.autocomplete-wrap{
    position: absolute;
    top: 50px;
    width: 240px;
    left: 0;
    padding: 8px;
    height: fit-content;
    border-radius: 8px;
    background-color: var(--var-c-bg-main);
}
.autocomplete-item{
    padding: 5px;
    border-radius: 8px;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: clip;
}
.autocomplete-item:hover{
    background-color: var(--var-c-hover-bg);
}
</style>