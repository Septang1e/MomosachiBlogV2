<script setup lang="ts">
import {ref} from 'vue'

// 假数据 - 后续替换为API调用
const stats = ref([
    { title: '总文章数', value: 0, icon: '📝', color: '#FFB6C1' },
    { title: '总评论数', value: 0, icon: '💬', color: '#87CEFA' },
    { title: '访问总量', value: 0, icon: '👀', color: '#98FB98' },
    { title: '草稿数量', value: 0, icon: '📑', color: '#DDA0DD' }
])

const recentPosts = ref([
    // 示例数据
    { title: '示例文章1', date: '2024-03-15', status: '已发布' },
    { title: '示例文章2', date: '2024-03-16', status: '草稿' }
])

// 空方法占位
const handleCreatePost = () => {
    console.log('创建新文章')
}
</script>

<template>
    <div class="dashboard-container">
        <h1 class="dashboard-title">仪表盘</h1>

        <!-- 统计卡片 -->
        <div class="stats-grid">
            <div
                v-for="(stat, index) in stats"
                :key="index"
                class="stat-card"
            >
                <div class="stat-icon" :style="{ backgroundColor: stat.color }">
                    {{ stat.icon }}
                </div>
                <div class="stat-content">
                    <h3>{{ stat.title }}</h3>
                    <p class="stat-value">{{ stat.value }}</p>
                </div>
            </div>
        </div>

        <!-- 快捷操作 -->
        <div class="quick-actions">
            <button
                class="action-button"
                @click="handleCreatePost"
            >
                📄 新建文章
            </button>
            <button class="action-button">🗂️ 管理分类</button>
            <button class="action-button">📊 查看统计</button>
        </div>

        <!-- 最近文章 -->
        <div class="recent-posts">
            <h2>最近文章</h2>
            <div class="post-list">
                <div
                    v-for="(post, index) in recentPosts"
                    :key="index"
                    class="post-item"
                >
                    <span class="post-title">{{ post.title }}</span>
                    <div class="post-meta">
                        <span class="post-date">{{ post.date }}</span>
                        <span
                            class="post-status"
                            :style="{
                color: post.status === '已发布' ? '#67C23A' : '#E6A23C'
              }"
                        >
              {{ post.status }}
            </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard-container {
    padding: 20px;
    min-height: var(--var-screen-height);
    background-color: var(--var-c-bg-main);
    backdrop-filter: blur(10px);
    border-radius: var(--var-card-border-radius);
    margin: 20px;
    color: var(--var-c-text);
}

.dashboard-title {
    margin-bottom: 30px;
    font-size: 24px;
    color: var(--var-c-hover-text);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    display: flex;
    align-items: center;
    padding: 20px;
    background: var(--var-c-bg-secondary);
    border-radius: var(--var-card-border-radius);
    box-shadow: var(--var-card-box-shadow);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-right: 15px;
}

.stat-content h3 {
    font-size: 16px;
    margin-bottom: 5px;
    color: var(--var-c-sub-text);
}

.stat-value {
    font-size: 24px;
    font-weight: bold;
    color: var(--var-c-hover-text);
}

.quick-actions {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
}

.action-button {
    padding: 12px 20px;
    border: none;
    border-radius: var(--var-card-border-radius);
    background: var(--var-button-bg);
    color: var(--var-button-c);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.action-button:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.recent-posts {
    background: var(--var-c-bg-secondary);
    border-radius: var(--var-card-border-radius);
    padding: 20px;
    box-shadow: var(--var-card-box-shadow);
}

.post-list {
    margin-top: 15px;
}

.post-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: var(--var-c-bg-main);
    border-radius: 8px;
    margin-bottom: 10px;
}

.post-title {
    flex-grow: 1;
    color: var(--var-c-text);
}

.post-meta {
    display: flex;
    gap: 20px;
    align-items: center;
}

.post-date {
    color: var(--var-c-sub-text);
    font-size: 0.9em;
}

.post-status {
    font-size: 0.9em;
    font-weight: bold;
}
</style>