<script lang="ts" setup>
import {useAppStore} from "@/stores";
const appStore = useAppStore()
import CoverSideImg from "@/assets/bg/A.jpg"
import {ref} from "vue";
const login_form = ref({
    username: '',
    password: ''
})
function usernameTypeCheck() {

}
function passwordTypeCheck() {

}


</script>

<template>
    <div class="login-wrap">
<!--        <div class="cover-side" v-if="!appStore.isMobile()">-->
<!--            <el-image fit="cover" class="cover-side-img" :src="CoverSideImg"/>-->
<!--        </div>-->
        <div class="login-side">
            <div class="logo">
                <el-icon class="bx bx-home"/> MomosachiBlog
            </div>
            <div class="login-text">
                欢迎来到MomosachiBlogBackend
            </div>
            <div class="login-username">
                <div class="placeholder">
                    用户名
                </div>
                <input class="input-login"/>
            </div>
            <div class="login-password">
                <div class="placeholder">
                    密码
                </div>
                <input class="input-login"/>
            </div>
            <div class="login-btn">
                登录
            </div>
        </div>
    </div>
</template>

<style scoped>
.error-border{
    border: red solid 1px;
}
.success-border{
    border: greenyellow solid 1px;
}
.hover-border{
    border: var(--var-c-hover-text) solid 1px;
}
.login-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
}
.cover-side{
    height: 400px;
    width: 450px;
    overflow: clip;
    border-radius: 30px 0 0 30px;
}
.login-side{
    border-radius: 15px;
    overflow: clip;
    background: var(--var-c-bg-main);
    display: flex;
    padding: 60px;
    box-shadow: var(--var-card-box-shadow);
    margin: 12px;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: fit-content;
}
@media (min-width: 768px) {
    .login-side{
        width: 400px;
    }
}
@media (max-width: 768px) {
    .login-side{
        height: 600px;
        width: 90vw;
    }
}
.logo{
    color: var(--var-c-hover-text);
    cursor: pointer;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}
.login-text{
    display: flex;
    margin: 12px;
    color: var(--var-c-sub-text);
    cursor: pointer;
    border: none;
}
.login-text:hover{
    color: var(--var-c-text);
    outline: none;
}
.input-login{
    height: 32px;
    width: 240px;
    border-radius: 12px;
    border: 0;
    outline: none;
    padding: 12px;
}
.placeholder{
    font-size: 12px;
}
.login-username{
    margin: 12px;
}
.login-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 32px;
    width: 220px;
    height: 32px;
    border-radius: 12px;
    cursor: pointer;
}
.placeholder{
    color: var(--var-c-text);
}
</style>