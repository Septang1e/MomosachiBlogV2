<script lang="ts" setup>
import {useAppStore} from "@/stores";
import {ElInput, ElButton, ElLoading} from 'element-plus'
import CoverSideImg from "@/assets/bg/A.jpg"
import {ref} from "vue";
import {Lock, User} from "@element-plus/icons-vue";

const appStore = useAppStore()
const login_form = ref({
    username: '',
    password: ''
})
const isLoading = ref(false)
const isError = ref(false)

async function handleLogin() {
    isLoading.value = true
    try {
        // TODO 登录请求、后端重构

    } catch (e) {
        isError.value = true
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="login-container">
        <div class="login-card">
            <div class="card-header">
                <div class="logo">
                    <el-icon class="bx bx-home"/>
                    <span style="font-weight: bold">MomosachiBlog</span>
                </div>
                <h2 style="width: 100%; display: flex; align-items: center; justify-content: center">
                    Welcome to MomosachiBlog
                </h2>
            </div>

            <div class="card-body">
                <el-form
                    :model="login_form"
                    :class="{'error-state': isError}"
                    @submit.prevent="handleLogin"
                >
                    <el-form-item>
                        <el-input
                            v-model="login_form.username"
                            placeholder="用户名"
                            size="large"
                            :disabled="isLoading"
                        >
                            <template #prefix>
                                <el-icon><user /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-input
                            v-model="login_form.password"
                            type="password"
                            placeholder="密码"
                            size="large"
                            show-password
                            :disabled="isLoading"
                        >
                            <template #prefix>
                                <el-icon><lock /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-button
                        native-type="submit"
                        type="primary"
                        size="large"
                        :loading="isLoading"
                        class="login-btn"
                    >
                        {{ isLoading ? '登录中...' : '立即登录' }}
                    </el-button>
                </el-form>
            </div>

            <div class="card-footer">
                <span class="tip-text">忘记密码？</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px - 75px);
    background: linear-gradient(135deg, var(--var-c-bg-main) 0%, var(--var-c-bg-secondary) 100%);
    width: 100vw;
}

.login-card {
    width: 100%;
    max-width: 420px;
    padding: 2.5rem;
    background: var(--var-c-bg-main);
    border-radius: 1.5rem;
    box-shadow: var(--var-card-box-shadow);
    transform-style: preserve-3d;
    transition: all 0.3s ease;
}

.login-card:hover {
    transform: translateY(-5px);
}

.card-header {
    text-align: center;
    margin-bottom: 2rem;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    font-size: 1.75rem;
    color: var(--var-c-hover-text);
    margin-bottom: 1.5rem;
    font-weight: bold;
}

h2 {
    color: var(--var-c-text);
    font-size: 1.25rem;
    font-weight: 400;
}

:deep(.el-input__wrapper) {
    background: var(--var-c-bg-secondary) !important;
    border-radius: 12px !important;
    transition: all 0.3s ease;
}

:deep(.el-input__inner) {
    color: var(--var-c-text) !important;
}

:deep(.el-input:hover .el-input__wrapper) {
    box-shadow: 0 0 0 2px var(--var-c-hover-text) !important;
}

.login-btn {
    width: 100%;
    margin-top: 1.5rem;
    font-size: 1rem;
    letter-spacing: 0.1em;
    height: 48px;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.card-footer {
    margin-top: 1.5rem;
    text-align: center;
}

.tip-text {
    color: var(--var-c-sub-text);
    font-size: 0.875rem;
    cursor: pointer;
    transition: color 0.3s ease;
}

.tip-text:hover {
    color: var(--var-c-hover-text);
}

.error-state {
    animation: shake 0.5s;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(8px); }
    75% { transform: translateX(-8px); }
}

@media (max-width: 480px) {
    .login-card {
        margin: 1rem;
        padding: 1.5rem;
    }

    .logo {
        font-size: 1.5rem;
    }
}
</style>