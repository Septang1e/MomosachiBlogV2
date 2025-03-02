<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue'
import {ElAvatar, ElButton, ElMessage, ElInput} from 'element-plus'
import {ChatLineRound} from '@element-plus/icons-vue'
import {getDateTime} from "@/utils/time-utils";
import type {Comment} from "@/api/comment/types/comment";

const props = defineProps<{
    articlePid: string
}>()

const comments = ref<Comment[]>([])
const newComment = ref('')
const loading = ref(false)
const replyTo = ref<string | null>(null)
const commentForm = ref({
    username: '',
    email: '',
    website: '',
    content: ''
})

// 回复定位相关
const commentRefs = ref<HTMLElement[]>([])
const commentFormRef = ref<HTMLElement | null>(null)

const fetchComments = async () => {
    try {
        loading.value = true
        comments.value = [
            {
                pid: '1',
                content: '这篇文章写得真好！',
                createTime: Date.now(),
                user: {
                    username: '用户A',
                    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                    website: 'aaaa',
                    email: ''
                },
                likes: 5
            }
        ]
    } catch (e) {
        ElMessage.error('获取评论失败')
    } finally {
        loading.value = false
    }
}

// 提交评论
const submitComment = async () => {
    if (!commentForm.value.content.trim()) return
    if (!commentForm.value.username || !commentForm.value.email) {
        ElMessage.warning('请填写用户名和邮箱')
        return
    }

    try {
        // 新增表单数据
        comments.value.unshift({
            id: Date.now().toString(),
            content: commentForm.value.content,
            createTime: Date.now(),
            user: {
                username: commentForm.value.username,
                email: commentForm.value.email,
                website: commentForm.value.website,
                avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            },
            replyTo: replyTo.value,
            likes: 0
        })

        // 重置表单
        commentForm.value = { username: '', email: '', website: '', content: '' }
        replyTo.value = null
        ElMessage.success('评论成功')
    } catch (e) {
        ElMessage.error('评论失败')
    }
}


const handleReply = (commentId: string, username: string) => {
    replyTo.value = commentId
    commentForm.value.content = `@${username} `
    nextTick(() => {
        const targetIndex = commentRefs.value.findIndex(
            ref => ref?.dataset?.pid === commentId
        )
        if (targetIndex > -1 && commentFormRef.value) {
            commentRefs.value[targetIndex].appendChild(commentFormRef.value)
            commentFormRef.value.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }
    })
}

onMounted(fetchComments)
</script>

<template>
    <div class="comment-card">
        <h3 class="comment-title">评论（{{ comments.length }}）</h3>

        <!-- 评论列表 -->
        <div class="comment-list" v-loading="loading">
            <div
                v-for="(comment, index) in comments"
                :key="comment.id"
                class="comment-item"
                :ref="el => commentRefs[index] = el as HTMLElement"
                :data-comment-id="comment.id"
            >
                <ElAvatar :src="comment.user.avatar" size="default" />
                <div class="comment-content">
                    <div class="comment-header">
                        <div class="user-info">
                            <span class="username">{{ comment.user.username }}</span>
                            <span class="meta">
                                <span v-if="comment.user.website" class="website">
                                    <a :href="comment.user.website" target="_blank">{{ comment.user.website }}</a>
                                </span>
                                <span class="time">{{ getDateTime(comment.createTime) }}</span>
                            </span>
                        </div>
                    </div>
                    <p class="comment-text">
                        <span v-if="comment.replyTo" class="reply-hint">
                            回复 @{{ comments.find(c => c.pid === comment.replyTo)?.user.username }}
                        </span>
                        {{ comment.content }}
                    </p>
                    <div class="comment-actions">
                        <ElButton text class="action-btn">
                            <i class="bx bx-like" /> {{ comment.likes || '' }}
                        </ElButton>
                        <ElButton
                            text
                            :icon="ChatLineRound"
                            class="action-btn"
                            @click="handleReply(comment.id, comment.user.username)"
                        >
                            回复
                        </ElButton>
                    </div>
                </div>
            </div>
        </div>

        <!-- 评论输入 -->
        <div class="comment-form" ref="commentFormRef">
            <div class="form-header">
                <h4 v-if="replyTo">回复评论</h4>
                <h4 v-else>发表评论</h4>
                <ElButton
                    v-if="replyTo"
                    text
                    @click="replyTo = null"
                    class="cancel-reply"
                >
                    取消回复
                </ElButton>
            </div>

            <div class="input-group">
                <ElInput
                    v-model="commentForm.username"
                    placeholder="用户名 *"
                    class="form-input"
                    required
                />
                <ElInput
                    v-model="commentForm.email"
                    placeholder="邮箱 *"
                    class="form-input"
                    required
                />
                <ElInput
                    v-model="commentForm.website"
                    placeholder="网站（可选）"
                    class="form-input"
                />
            </div>

            <ElInput
                v-model="commentForm.content"
                type="textarea"
                :rows="3"
                placeholder="写下你的评论..."
                class="comment-input"
                resize="none"
            />

            <div class="form-actions">
                <ElButton
                    type="primary"
                    @click="submitComment"
                    :disabled="!commentForm.content.trim() || !commentForm.username || !commentForm.email"
                >
                    发布评论
                </ElButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
.comment-card {
    background: var(--var-c-bg-main);
    border-radius: 12px;
    padding: 24px;
    margin-top: 2rem;
    box-shadow: var(--var-card-box-shadow);
}

.comment-title {
    color: var(--var-c-text);
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    padding-bottom: 0.75rem;
}

.comment-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.comment-item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: var(--var-c-bg-secondary);
    border-radius: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.comment-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.comment-content {
    flex: 1;
}

.comment-header {
    margin-bottom: 0.5rem;
}

.user-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.username {
    font-weight: 500;
    color: var(--var-c-text);
    font-size: 0.95rem;
}

.meta {
    display: flex;
    gap: 0.75rem;
    font-size: 0.85rem;
    color: var(--var-c-sub-text);
}

.website a {
    color: var(--var-c-hover-text);
    text-decoration: none;
}

.website a:hover {
    text-decoration: underline;
}

.comment-text {
    color: var(--var-c-text);
    line-height: 1.6;
    margin: 0.5rem 0;
    white-space: pre-wrap;
}

.reply-hint {
    color: var(--var-c-hover-text);
    margin-right: 0.5rem;
    font-weight: 500;
}

.comment-actions {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
}

.action-btn {
    padding: 0;
    color: var(--var-c-sub-text);
    font-size: 0.85rem;
}

.action-btn:hover {
    color: var(--var-c-hover-text);
}

.comment-form {
    border-top: 2px solid var(--var-card-color-border);
    padding-top: 1.5rem;
    margin-top: 2rem;
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.form-header h4 {
    color: var(--var-c-text);
    font-size: 1.1rem;
}

.cancel-reply {
    color: var(--var-c-sub-text);
    font-size: 0.9rem;
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
    border: 1px solid var(--var-card-color-border);
    padding: 0.75rem;
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