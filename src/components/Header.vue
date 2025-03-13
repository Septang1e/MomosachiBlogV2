<script lang="ts" setup>
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {useAdminStore, useAppStore} from "@/stores";
import {useRoute} from "vue-router";
import Search from "@/components/sub/Search.vue";
import MdEditorCatalog from "@/components/sub/MdEditorCatalog.vue";
import AdminAvatar from "@/assets/resource/avatar.jpg"
const appStore = useAppStore()
const route = useRoute()
const tool_box_items = reactive([
    { name: '首页', uri: '/', icons: 'bx bxs-home', styles: '', route_name: 'home' },
    { name: '归档', uri: '/archive', icons: 'bx bxs-archive', styles: '', route_name: 'archive' },
    { name: 'RAG知识库', uri: '/rag', icons: 'bx bxs-archive', styles: '', route_name: 'rag' },

])
const header_style = ref("")
const header_class = ref("")
const menuDrawerRef = ref(false)
const adminStore = useAdminStore()

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

function toggleMenuClick() {
    if(!appStore.sideBarVisible()) {
        menuDrawerRef.value = !menuDrawerRef.value
    }
}
function handleMenuDrawerVisible() {
    if(menuDrawerRef.value) {
        menuDrawerRef.value = !appStore.sideBarVisible() && appStore.headerVisible()
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
function resizeEventListener() {
    handleMenuDrawerVisible()
}

onMounted(()=>{
    currentRoute.value = <string>route.name
    scrollEventListener()
    addEventListener("scroll", scrollEventListener)
    addEventListener("resize", resizeEventListener)
})
onUnmounted(()=>{
    removeEventListener("scroll", scrollEventListener)
    removeEventListener("resize", resizeEventListener)
})

</script>

<template>

    <div :style="header_style" :class="header_class + ' header-box'">
        <el-icon
            v-if="!appStore.sideBarVisible()"
            class="bx bx-menu show-menu-btn"
            :size="25"
            @click="toggleMenuClick"
        />

        <el-drawer
            v-model="menuDrawerRef"
            direction="ltr"
            size="70%"
            class="menu-drawer"
            :lock-scroll="false"
            :with-header="false"
            append-to-body
            destroy-on-close
        >
            <div class="menu-drawer-wrap">

<!--                <div class="drawer-admin-info drawer-item">-->
<!--                    <el-avatar-->
<!--                        size="300"-->
<!--                        class="admin-avatar"-->
<!--                        :src="AdminAvatar"-->
<!--                    />-->

<!--                </div>-->

                <div
                    v-if="route.name === 'article'"
                    class="drawer-catalog drawer-item"
                >
                    <MdEditorCatalog
                        style="width: 100%; background-color: transparent !important;"
                        editor-id="preview-only"/>
                </div>


                <div class="drawer-item drawer-navigation">
                    <h2><el-icon><Menu /></el-icon> 导航</h2>
                    <div class="drawer-nav-list">
                        <router-link
                            v-for="(item, index) in tool_box_items"
                            :key="index"
                            :to="item.uri"
                            class="drawer-nav-item"
                            :class="{ 'active': match(item.route_name) }"
                        >
                            <i :class="item.icons"></i>
                            <span>{{ item.name }}</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </el-drawer>

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
.drawer-catalog{
    width: 100%;
    position: relative;
}

.drawer-admin-info{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.admin-avatar{
    width: 50px;
    height: 50px;
}

.drawer-item{
    margin-bottom: 30px;
    box-shadow: var(--var-drawer-box-shadow);
    background-color: var(--var-c-bg-main);
    border-radius: 8px;
}

.drawer-navigation{
    padding: 20px;
}

.drawer-navigation h2 {
    display: flex;
    align-items: center;
    font-size: var(--var-c-card-title-font-size);
    margin-bottom: 16px;
    font-weight: 600;
    color: var(--var-c-text);
}

.drawer-navigation h2 .el-icon {
    margin-right: 8px;
}

.drawer-nav-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.drawer-nav-item {
    display: flex;
    align-items: center;
    border-radius: 8px;
    text-decoration: none;
    padding: 12px 16px;
    color: var(--var-c-text);
    transition: all 0.3s ease;
}

.drawer-nav-item:hover {
    background-color: var(--var-c-hover-bg);
}

.drawer-nav-item.active {
    background-color: var(--var-c-hover-bg);
    color: #409eff;
}

.drawer-nav-item i {
    margin-right: 12px;
    font-size: 20px;
}

.drawer-nav-item span {
    font-size: 16px;
}


</style>

<style>
.el-drawer{
    background-color: var(--var-c-bg-solid);
}

</style>