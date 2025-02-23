<script setup lang="ts">
import {onMounted, ref} from "vue";
import {queryCategoryRank} from "@/api/category";
import type {Category} from "@/api/category/types/category";

const categoryData = ref<Category[]>([])
function queryCategoryData() {
    queryCategoryRank().then(res => {
        res.data.map(item => {
            categoryData.value.push(item)
        })
    })
}
onMounted(()=>{
    queryCategoryData()
})

</script>

<template>
    <div class="category-card">
        <div class="title-wrap">
            <div id="title"><el-icon class="bx bxs-category"/>分类</div>
        </div>
        <div class="category-wrap">
            <router-link :to="`/category/${item.pid}`" v-for="item in categoryData" class="category-sub-card">
                <div class="category-name">
                    {{item.name}}
                </div>
                <div class="category-count">
                    {{item.articleCount}}
                </div>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.category-card{
    color: var(--var-c-text);
    background: var(--var-c-bg-main);
    border-radius: var(--var-card-border-radius);
    transition: background ease-in-out 0.3s, box-shadow ease-in-out 0.3s, border ease-in-out 0.3s;
    padding: 20px;
    min-height: 300px;
}
#title{
    font-weight: bold;
    font-size: var(--var-c-card-title-font-size);
    align-items: center;
    justify-content: center;
    display: flex;
}
#title:hover{
    cursor: pointer;
}
.title-wrap{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.category-sub-card{
    display: flex;
    color: var(--var-c-text);
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    margin: 2px 5px;
    font-size: var(--var-c-card-item-font-size);
    font-weight: bold;
}
.category-name{
    transition: transform ease-in-out 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--var-c-sub-text);
    font-weight: bold;
}
.category-sub-card:hover{
    cursor: pointer;
    border-radius: 12px;
    background-color: var(--var-c-tag-bg);
}
.category-sub-card:hover{
    .category-name{
        transform: translateX(3px);
    }
}
.category-count{
    background-color: var(--var-c-hover-bg);
    height: 1.75rem;
    min-width: 2rem;
    display: flex;
    color: var(--var-c-tag-text);
    align-items: center;
    justify-content: center;
    border-radius: 12px;
}
</style>