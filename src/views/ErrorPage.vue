<script setup lang="ts">
import {useAppStore} from "@/stores";
import {useRouter} from "vue-router";
import {ElButton} from 'element-plus'
import {HomeFilled} from "@element-plus/icons-vue";

const appStore = useAppStore()
const router = useRouter()

function goHome() {
    router.push('/')
}
</script>

<template>
    <main class="error-container">
        <section class="error-content">
            <!-- 动态错误码 -->
            <div class="error-code" :class="{'mobile': appStore.isMobile()}">
                <span class="digit" data-digit="4">4</span>
                <div class="planet-container">
                    <div class="planet"></div>
                </div>
                <span class="digit" data-digit="0">0</span>
                <span class="digit" data-digit="4">4</span>
            </div>

            <!-- 错误信息 -->
            <div class="error-message">
                <h1>{{ appStore.isMobile() ? '页面失踪了！' : '您访问的页面已迷失在数字宇宙中' }}</h1>
                <p>可能是地址错误或页面已被移除，建议返回主页重新探索</p>
            </div>

            <!-- 返回按钮 -->
            <el-button
                type="primary"
                size="large"
                @click="goHome"
                class="home-btn"
            >
                <el-icon><HomeFilled /></el-icon>
                返回首页
            </el-button>
        </section>
    </main>
</template>

<style scoped>
.error-container {
    min-height: var(--var-screen-height);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
        135deg,
        var(--var-c-bg-main) 0%,
        var(--var-c-bg-secondary) 100%
    );
    padding: 2rem;
}

.error-content {
    text-align: center;
    max-width: 800px;
    animation: fadeInUp 0.8s ease;
}

.error-code {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    position: relative;
}

.digit {
    font-size: 12rem;
    font-weight: 900;
    color: var(--var-c-hover-text);
    text-shadow: 4px 4px 12px var(--var-c-hover-bg);
    animation: float 3s ease-in-out infinite;
}

.planet-container {
    position: relative;
    width: 120px;
    height: 120px;
    animation: rotate 20s linear infinite;
}

.planet {
    width: 100%;
    height: 100%;
    background: var(--var-c-hover-text);
    border-radius: 50%;
    position: relative;
    box-shadow:
        inset -25px -25px 40px rgba(0,0,0,0.3),
        0 0 50px var(--var-c-hover-bg);
}

.planet::after {
    content: '';
    position: absolute;
    width: 30%;
    height: 30%;
    background: var(--var-c-hover-bg);
    border-radius: 50%;
    top: 20%;
    left: 60%;
}

.error-message h1 {
    font-size: 2.2rem;
    color: var(--var-c-text);
    margin-bottom: 1rem;
    letter-spacing: 1px;
}

.error-message p {
    color: var(--var-c-sub-text);
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

.home-btn {
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-size: 1.1rem;
    transition: all 0.3s ease;
}

.home-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px var(--var-c-hover-bg);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .digit {
        font-size: 8rem;
    }

    .planet-container {
        width: 80px;
        height: 80px;
    }

    .error-message h1 {
        font-size: 1.8rem;
    }
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>