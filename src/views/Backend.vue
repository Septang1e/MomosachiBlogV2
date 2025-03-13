<script lang="ts" setup>

import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import userAvatar from "@/assets/resource/avatar.jpg"

const route = useRoute()
const isCollapsed = ref(false)
const isLight = ref(true)
const activeMenu = computed(() => route.meta.activeMenu || route.name)

const menuItems = ref([
    { key: 'dashboard', title: '仪表盘', icon: 'icon-dashboard', path: '/admin/dashboard' },
    { key: 'posts', title: '内容管理', icon: 'icon-posts', path: '/admin/posts', badge: '12' },
    { key: 'users', title: '用户管理', icon: 'icon-users', path: '/admin/users' },
    { key: 'analytics', title: '数据分析', icon: 'icon-analytics', path: '/admin/analytics' },
    { key: 'engagement', title: '互动管理', icon: 'icon-engagement', path: '/admin/engagement' },
    { key: 'trends', title: '趋势管理', icon: 'icon-trends', path: '/admin/trends' },
    { key: 'ads', title: '广告管理', icon: 'icon-ads', path: '/admin/ads' },
    { key: 'settings', title: '系统设置', icon: 'icon-settings', path: '/admin/settings' }
])

const breadcrumbs = computed(() => {
    const routePath = route.path
    const routeSegments = routePath.split('/').filter(segment => segment)

    if (routeSegments.length > 1) {
        const currentSegment = routeSegments[routeSegments.length - 1]
        const found = menuItems.value.find(item => item.path.includes(currentSegment))
        return found ? ['首页', found.title] : ['首页']
    }

    return ['首页']
})

const userName = ref('管理员')
const userRole = ref('超级管理员')

// 切换侧边栏折叠状态
const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
}

// 切换主题
const toggleTheme = () => {
    isLight.value = !isLight.value
    // 只改变管理界面的主题，不影响前台主题
}

onMounted(() => {
    // 检查是否有保存的主题设置
    const savedTheme = localStorage.getItem('adminTheme')
    if (savedTheme) {
        isLight.value = savedTheme === 'light'
    }
})



</script>

<template>
    <div class="backend-container" :class="{'admin-light': isLight, 'admin-dark': !isLight}">
        <!-- 左侧侧边栏 -->
        <aside class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
            <div class="logo-container">
                <div class="logo">
                    <img src="@/assets/resource/logo.png" alt="Logo" />
                    <span v-if="!isCollapsed">TwitterAdmin</span>
                </div>
                <button class="collapse-btn" @click="toggleSidebar">
                    <i :class="isCollapsed ? 'icon-expand' : 'icon-collapse'"></i>
                </button>
            </div>

            <nav class="nav-menu">
                <div v-for="(item, index) in menuItems" :key="index" class="nav-item">
                    <router-link :to="item.path" class="nav-link" :class="{ 'active': activeMenu === item.key }">
                        <i :class="item.icon"></i>
                        <span v-if="!isCollapsed">{{ item.title }}</span>
                        <div v-if="item.badge && !isCollapsed" class="badge"></div>
                    </router-link>
                </div>
            </nav>

            <div class="sidebar-footer">
                <div class="user-info" v-if="!isCollapsed">
                    <img :src="userAvatar" alt="User Avatar" class="user-avatar" />
                    <div class="user-details">
                        <div class="user-name">{{ userName }}</div>
                        <div class="user-role">{{ userRole }}</div>
                    </div>
                </div>
                <div class="user-avatar-only" v-else>
                    <img :src="userAvatar" alt="User Avatar" class="user-avatar" />
                </div>
            </div>
        </aside>

        <!-- 右侧内容区 -->
        <div class="main-content">
            <!-- 顶部导航栏 -->
            <header class="header">
                <div class="header-left">
                    <div class="breadcrumb">
            <span v-for="(crumb, index) in breadcrumbs" :key="index">
              {{ index > 0 ? ' / ' : '' }}{{ crumb }}
            </span>
                    </div>
                </div>

                <div class="header-right">
                    <div class="header-actions">
                        <button class="action-btn search-btn">
                            <i class="icon-search"></i>
                        </button>

                        <button class="action-btn notification-btn">
                            <i class="icon-notification"></i>
                            <span class="notification-indicator"></span>
                        </button>

                        <div class="theme-toggle">
                            <button class="theme-btn" @click="toggleTheme">
                                <i :class="isLight ? 'icon-moon' : 'icon-sun'"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <!-- 主要内容区域 -->
            <main class="content-wrapper">
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </main>
        </div>
    </div>
</template>

<style scoped>
.backend-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: var(--admin-bg-color);
    color: var(--admin-text);
}

/* 侧边栏样式 */
.sidebar {
    width: 250px;
    height: 100%;
    background-color: var(--admin-bg-panel);
    border-right: 1px solid var(--admin-border-color);
    transition: width 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    box-shadow: var(--admin-card-shadow);
    z-index: 100;
}

.sidebar-collapsed {
    width: 70px;
}

.logo-container {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--admin-divider);
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--admin-primary-blue);
}

.logo img {
    width: 30px;
    height: 30px;
}

.collapse-btn {
    background: transparent;
    border: none;
    color: var(--admin-sub-text);
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.collapse-btn:hover {
    color: var(--admin-hover-text);
}

.nav-menu {
    flex-grow: 1;
    padding: 20px 0;
}

.nav-item {
    margin-bottom: 5px;
}

.nav-link {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: var(--admin-text);
    text-decoration: none;
    position: relative;
    transition: all 0.2s ease;
    border-radius: 8px;
    margin: 0 10px;
}

.nav-link i {
    font-size: 1.2rem;
    margin-right: 15px;
    width: 20px;
    text-align: center;
}

.sidebar-collapsed .nav-link i {
    margin-right: 0;
}

.nav-link:hover {
    background-color: var(--admin-hover-bg);
    color: var(--admin-hover-text);
}

.nav-link.active {
    background: var(--admin-sidebar-active);
    color: white;
}

.badge {
    position: absolute;
    right: 15px;
    background-color: var(--admin-notification);
    color: white;
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 0.7rem;
}

.sidebar-footer {
    padding: 15px;
    border-top: 1px solid var(--admin-divider);
}

.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.user-avatar {
    max-width: 40px;
    max-height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.user-avatar-only {
    display: flex;
    justify-content: center;
}

.user-details {
    overflow: hidden;
}

.user-name {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.user-role {
    font-size: 0.8rem;
    color: var(--admin-sub-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 主内容区样式 */
.main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.header {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: var(--admin-bg-panel);
    box-shadow: var(--admin-card-shadow);
}

.breadcrumb {
    font-size: 1rem;
    color: var(--admin-text);
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 15px;
}

.action-btn {
    background: transparent;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--admin-text);
    cursor: pointer;
    position: relative;
    transition: background-color 0.2s ease;
}

.action-btn:hover {
    background-color: var(--admin-hover-bg);
}

.notification-indicator {
    position: absolute;
    top: 8px;
    right: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--admin-notification);
}

.content-wrapper {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: transparent;
}

/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>