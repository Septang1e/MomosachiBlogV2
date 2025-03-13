<script setup lang="ts">

import {ElButton, ElInput, ElNotification} from "element-plus";
import type { Comment } from "@/api/comment/types/comment";
import _ from "lodash"
import { ref } from "vue";
import {postComment} from "@/api/comment";

const props = defineProps<{
    articlePid: string,
    parentId: string | undefined,
    replyTo: string | undefined
}>()
const emits = defineEmits<{
    (event: 'onSubmitted', comment: Comment) : void
}>()

const replyTo = ref<string>('')
const commentForm = ref<Comment>({
    articlePid: <string>props.articlePid,
    commentId: "",
    state: 0,
    content: '',
    parentId: <string>props.parentId,
    replyTo: <string>props.replyTo,
    createTime: 0,
    updateTime: 0,
    likes: 0,
    user: {
        uid: '',
        nickname: '',
        avatar: '',
        email: '',
        website: ''
    }
})
const emptyForm = ref<Comment>({
    articlePid: "",
    commentId: "",
    state: 0,
    content: '',
    parentId: <string>props.parentId,
    replyTo: <string>props.replyTo,
    createTime: 0,
    updateTime: 0,
    likes: 0,
    user: {
        uid: '',
        nickname: '',
        avatar: '',
        email: '',
        website: ''
    }
})

function verifyFormValidation() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(commentForm.value.user.email)) {
        ElNotification.error({
            title: 'Error',
            message: '请输入正确的邮箱喵'
        })
        return false
    }
    return true

}

function submitComment() {
    if(verifyFormValidation()) {
        commentForm.value.articlePid = <string>props.articlePid
        postComment(commentForm.value).then((res)=>{
            ElNotification({
                title: 'Success',
                message: "确实收到你的评论啦，请等待审核喵",
                type: "success"
            })
            emits("onSubmitted", commentForm.value)
            resetForm()
        })
    }
}

const resetForm = () => {
    commentForm.value = _.cloneDeep(emptyForm.value)
}

</script>

<template>
    <div class="comment-form" v-if="replyTo === ''">
        <div class="form-header">
            <h4 style="font-weight: bold">发表评论</h4>
        </div>

        <div class="input-group">
            <el-input v-model="commentForm.user.nickname" placeholder="用户名 *" class="form-input" required />
            <el-input v-model="commentForm.user.email" placeholder="请输入正确的邮箱，否则审核可能不通过 *" class="form-input" required />
            <el-input v-model="commentForm.user.website" placeholder="网站（可选）" class="form-input" />
        </div>

        <el-input v-model="commentForm.content" type="textarea" :rows="3" placeholder="写下你的评论..." class="comment-input"
            resize="none" />

        <div class="form-actions">
            <el-button type="primary" @click="submitComment"
                :disabled="!commentForm.content.trim() || !commentForm.user.nickname || !commentForm.user.email">
                评论
            </el-button>
        </div>
    </div>
</template>

<style scoped>
.comment-form * {
    color: var(--var-c-text);
}

.input-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-input {
    margin-bottom: 0.5rem;
}

.comment-input {
    width: 100%;
    border-radius: 8px;
    background: var(--var-c-bg-secondary);
    color: var(--var-c-text);
    transition: border-color 0.2s;
}

.comment-input:focus {
    border-color: var(--var-c-hover-text);
    outline: none;
}

.form-actions {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
}

@media (max-width: 768px) {
    .input-group {
        grid-template-columns: 1fr;
    }

    .comment-item {
        padding: 0.75rem;
    }

    .comment-form {
        padding-top: 1rem;
    }
}
</style>

<style>
.comment-form .el-input__wrapper {
    background: var(--var-c-bg-secondary);
    border: var(--var-card-color-border) solid 2px;
    transition: border ease-in-out 0.2s;
    box-shadow: none;
    font-size: 14px;
}

.comment-form .el-textarea__inner {
    background: var(--var-c-bg-secondary);
    border: var(--var-card-color-border) solid 2px;
    transition: border ease-in-out 0.2s;
    box-shadow: none;
    font-size: 14px;
}

.comment-form .el-input__wrapper:focus-within {
    border-color: var(--var-c-hover-text);
    /* 选中的边框颜色 */
}

.comment-form .el-textarea__inner:focus-within {
    border-color: var(--var-c-hover-text);
    /* 选中的边框颜色 */
}
</style>