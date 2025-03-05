<template>
    <div class="backend-container">
        <el-container>
            <!-- 顶部导航栏 -->
            <el-header class="backend-header">
                <div class="logo-container">
                    <img src="@/assets/resource/avatar.jpg" alt="Logo" class="logo" />
                    <h1 class="title">博客管理系统</h1>
                </div>
                <div class="header-actions">
                    <div class="theme-switch">
                        <el-dropdown @command="handleThemeChange">
                            <el-icon><Brush /></el-icon>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="light">浅色模式</el-dropdown-item>
                                    <el-dropdown-item command="dark">深色模式</el-dropdown-item>
                                    <el-dropdown-item command="customize">自定义主题</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div class="user-info">
                        <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon><Avatar /></el-icon>
                {{ username }}
                <el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="handleProfile">个人资料</el-dropdown-item>
                                    <el-dropdown-item @click="handleLogout" divided>退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>

            <el-container>
                <!-- 侧边菜单栏 -->
                <el-aside width="200px" class="backend-aside">
                    <el-menu
                        default-active="dashboard"
                        class="el-menu-vertical-demo"
                        router
                        :background-color="menuBackgroundColor"
                        :text-color="menuTextColor"
                        :active-text-color="menuActiveTextColor"
                    >
                        <el-menu-item index="dashboard">
                            <el-icon><DataBoard /></el-icon>
                            <span>仪表盘</span>
                        </el-menu-item>
                        <el-menu-item index="articles">
                            <el-icon><Document /></el-icon>
                            <span>文章管理</span>
                        </el-menu-item>
                        <el-menu-item index="categories">
                            <el-icon><Folder /></el-icon>
                            <span>分类管理</span>
                        </el-menu-item>
                        <el-menu-item index="tags">
                            <el-icon></el-icon>
                            <span>标签管理</span>
                        </el-menu-item>
                        <el-menu-item index="comments">
                            <el-icon><ChatLineRound /></el-icon>
                            <span>评论管理</span>
                        </el-menu-item>
                        <el-menu-item index="settings">
                            <el-icon><Setting /></el-icon>
                            <span>系统设置</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <!-- 主内容区 -->
                <el-main class="backend-main">
                    <router-view v-slot="{ Component }">
                        <transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    DataBoard,
    Document,
    Folder,
    ChatLineRound,
    Setting,
    Avatar,
    ArrowDown,
    Brush
} from '@element-plus/icons-vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

// 用户名（后续从状态管理或登录信息获取）
const username = ref('管理员')

// 主题相关计算属性
const menuBackgroundColor = computed(() => {
    return appStore.theme === 'dark'
        ? 'var(--var-c-dark-bg-secondary)'
        : 'var(--var-c-white-bg-main)'
})

const menuTextColor = computed(() => {
    return appStore.theme === 'dark'
        ? 'var(--var-c-dark-text)'
        : 'var(--var-c-white-text)'
})

const menuActiveTextColor = computed(() => {
    return appStore.theme === 'dark'
        ? 'var(--var-c-dark-hover-text)'
        : 'var(--var-c-white-hover-text)'
})

// 主题切换方法
const handleThemeChange = (theme: string) => {
    appStore.setTheme(theme)
    document.documentElement.className = theme
}

// 占位方法，后续根据实际需求实现
const handleProfile = () => {
    console.log('查看个人资料')
}

const handleLogout = () => {
    console.log('退出登录')
}
</script>

<style scoped>
.backend-container {
    height: 100vh;
    background-color: var(--var-c-bg-main);
    color: var(--var-c-text);
    transition: background-color 0.3s, color 0.3s;
}

.backend-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--var-button-bg);
    color: var(--var-button-c);
    padding: 0 20px;
    height: 60px;
}

.logo-container {
    display: flex;
    align-items: center;
}

.logo {
    height: 40px;
    margin-right: 10px;
}

.title {
    margin: 0;
    font-size: 18px;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 15px;
}

.theme-switch {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.user-info {
    color: var(--var-button-c);
}

.backend-aside {
    background-color: var(--var-c-bg-secondary);
    transition: background-color 0.3s;
}

.backend-main {
    background-color: var(--var-c-bg-main);
    padding: 20px;
    transition: background-color 0.3s;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>