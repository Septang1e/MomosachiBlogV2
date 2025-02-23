<script lang="ts" setup>
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {useAppStore} from "@/stores";
import {useRoute} from "vue-router";
import Search from "@/components/sub/Search.vue";
const appStore = useAppStore()
const route = useRoute()
const tool_box_items = reactive([
    { name: '首页', uri: '/', icons: 'bx bxs-home', styles: '', route_name: 'home' },
    { name: '归档', uri: '/archive', icons: 'bx bxs-archive', styles: '', route_name: 'archive' },

])
const header_style = ref("")
const header_class = ref("")

function handleHeaderVisibilityState() {
    const currentY = window.scrollY
    header_style.value = "background-color: var(--var-c-bg-main);"
}
function handlerHeaderHideState() {
    appStore.handleHeaderVisibility()
    if(appStore.headerVisible()) {
        header_class.value = 'header-is-hide'
    }else{
        header_class.value = ""
    }
}
const currentRoute = ref<String>(<string>route.name)
function match(s: string | undefined) {

    if(s === undefined || currentRoute.value === undefined || s.length > currentRoute.value.length) {
        return false
    }

    return s === currentRoute.value.substring(0, s.length);
}
watch(()=>route.fullPath, ()=>{
    currentRoute.value = <string>route.name
})
function scrollEventListener() {
    handleHeaderVisibilityState()
    handlerHeaderHideState()
}

onMounted(()=>{
    currentRoute.value = <string>route.name
    scrollEventListener()
    addEventListener("scroll", scrollEventListener)
})
onUnmounted(()=>{
    removeEventListener("scroll", scrollEventListener)
})

</script>

<template>
    <div :style="header_style" :class="header_class + ' header-box'">
        <el-icon
            v-if="!appStore.sideBarVisible()"
            class="bx bx-menu show-menu-btn"
            :size="25"
            @click=""
        />
        <div class="logo">
            <router-link to="/" class="logo-content">
<!--                <el-icon size="100%" style="margin-right: 5px">-->
<!--                    <el-image id="icon" fit="contain" :src="LogoMomosachi"/>-->
<!--                </el-icon>-->
                <el-icon class="bx bx-home"/>
                Momosachi
            </router-link>
            <div class="search-box" v-if="appStore.sideBarVisible()">
                <Search/>
            </div>
        </div>
        <div class="nav-box" v-if="appStore.sideBarVisible()">
            <div v-for="item in tool_box_items" class="nav-item">
                <router-link :to="item.uri" class="item" :class="match(item.route_name) ? 'hover-text' : ''">
                    <el-icon :class="item.icons"/>
                    <div class="name">
                        {{item.name}}
                    </div>
                </router-link>
            </div>
            <div class="tool-bar">
            </div>
        </div>
        <el-icon
            v-if="!appStore.sideBarVisible()"
            class="bx bx-cog show-tool-kit-btn"
            :size="25"
            @click=""
        />
    </div>
</template>

<style scoped>
.header-is-hide{
    transform: translateY(-50px);
    opacity: 0;
}
.header-box{
    height: 50px;
    /**position: fixed;*/
    position: fixed;
    background-color: var(--var-c-bg-main);
    align-items: center;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    z-index: 998;
    /* 255 182 193 */
    display: flex;
    justify-content: space-evenly;
    transition: background-color ease-in-out 0.4s, transform ease-in-out 0.4s, opacity ease-in-out 0.4s;
}
.logo{
    width: fit-content;
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.logo{
    /*text-shadow: rgba(255, 158, 206) 0 1px, rgba(2, 251, 209) 0 -1px;*/
    /**text-shadow: rgba(255, 158, 206) 1px -1px, rgba(2, 251, 209) 2px -2px;*/
}
.logo-content{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    color: var(--var-c-hover-text);
    font-weight: bold;
}
.logo-content:hover{
    cursor: pointer;
}
.nav-item *{
    color: var(--var-c-sub-text);
    font-weight: bold;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

}
.nav-item{
    width: fit-content;
    padding: 0 15px;
    position: relative;
}
.item:hover *{
    color: var(--var-c-hover-text) !important;
}
.item:hover:after{
    content: "";
    position: absolute;
    bottom: 0;
    width: calc(100% - 20px);
    transition: width ease-in-out 0.4s;
    height: 2px;
    background-color: var(--var-c-hover-text);
}
.nav-box{
    display: flex;
    align-items: center;
}
.hover-text *{
    color: var(--var-c-hover-text) !important;
}
.hover-text:after{
    content: "";
    position: absolute;
    bottom: 0;
    width: calc(100% - 20px);
    transition: width ease-in-out 0.4s;
    height: 2px;
    background-color: var(--var-c-hover-text);
}
.show-menu-btn{
    color: var(--var-c-sub-text);
    cursor: pointer;
}
.show-menu-btn:hover{
    color: var(--var-c-hover-text);
}
.show-tool-kit-btn{
    color: var(--var-c-sub-text);
    cursor: pointer;
}
.show-tool-kit-btn:hover{
    color: var(--var-c-hover-text);
}
.search-box{
    margin-left: 10px;
}
</style>