<template>
    <div class="comment-management">
        <div class="page-header">
            <h1>评论管理</h1>
            <div class="filter-bar">
                <el-select v-model="filterState" placeholder="评论状态" size="small">
                    <el-option label="全部" :value="null" />
                    <el-option label="待审核" :value="0" />
                    <el-option label="已通过" :value="1" />
                    <el-option label="已拒绝" :value="2" />
                </el-select>
                <el-input
                    v-model="searchQuery"
                    placeholder="搜索评论内容或用户"
                    prefix-icon="el-icon-search"
                    size="small"
                    clearable
                />
                <el-button type="primary" size="small" @click="fetchComments">查询</el-button>
            </div>
        </div>

        <el-card class="comment-list-card">
            <el-table
                :data="comments"
                :border="false"
                style="width: 100%"
                v-loading="loading"
            >
                <el-table-column label="评论ID" prop="commentId" width="150" />
                <el-table-column label="用户信息" width="180">
                    <template #default="props">
                        <div class="user-info">
                            <div class="user-avatar"><el-avatar :src="props.row.user.avatar" /></div>
                            <div class="user-details">
                                <div class="user-nickname">{{ props.row.user.nickname }}</div>
                                <div class="user-email">{{ props.row.user.email }}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="评论内容">
                    <template #default="props">
                        <div class="comment-content">
                            <p>{{ props.row.content }}</p>
                            <div class="comment-meta">
                                <span style="cursor: pointer" @click="router.push(`/article/${props.row.articlePid}`)">文章ID: {{ props.row.articlePid }}</span>
                                <span v-if="props.row.parentId">回复评论ID: {{ props.row.parentId }}</span>
                                <span v-if="props.row.replyTo">回复用户ID: {{ props.row.replyTo }}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="评论状态" prop="state" width="100">
                    <template #default="props">
                        <el-tag :type="getStateTag(props.row.state)">
                            {{ getStateLabel(props.row.state) }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="170">
                    <template #default="props">
                        {{ formatDate(props.row.createTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250">
                    <template #default="{ row }">
                        <el-button
                            size="small"
                            type="success"
                            plain
                            @click="approveComment(row)"
                            :disabled="row.state === 1"
                        >
                            通过
                        </el-button>
                        <el-button
                            size="small"
                            type="danger"
                            plain
                            @click="rejectComment(row)"
                            :disabled="row.state === 2"
                        >
                            拒绝
                        </el-button>
                        <el-button
                            size="small"
                            type="primary"
                            plain
                            @click="editComment(row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            size="small"
                            type="danger"
                            plain
                            @click="removeComment(row)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-container">
                <el-pagination
                    background
                    layout="prev, pager, next, sizes, total"
                    :current-page="page_conf.current"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="page_conf.size"
                    :total="page_conf.total"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                />
            </div>
        </el-card>

        <!-- 编辑评论对话框 -->
        <el-dialog
            title="编辑评论"
            :visible.sync="dialogVisible"
            width="600px"
        >
            <el-form :model="editForm" label-width="100px">
                <el-form-item label="评论ID">
                    <el-input v-model="editForm.commentId" disabled />
                </el-form-item>
                <el-form-item label="用户">
                    <el-input v-model="editForm.user.nickname" disabled />
                </el-form-item>
                <el-form-item label="评论内容">
                    <el-input type="textarea" v-model="editForm.content" rows="4" />
                </el-form-item>
                <el-form-item label="评论状态">
                    <el-radio-group v-model="editForm.state">
                        <el-radio :label="0">待审核</el-radio>
                        <el-radio :label="1">已通过</el-radio>
                        <el-radio :label="2">已拒绝</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveComment">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {ElMessageBox, ElMessage, ElNotification} from 'element-plus'
import type {Comment, CommentQueryDTO} from "@/api/comment/types/comment";
import type {PageConfig} from "@/api/page";
import {deactivateComment, deleteComment, queryCommentBackendPage, releaseComment} from "@/api/comment";
import {useRouter} from "vue-router";

interface EditForm {
    commentId: string
    user: {
        nickname: string
        email: string
    }
    content: string
    state: 0 | 1 | 2
}
const router = useRouter()
// 响应式数据
const comments = ref<Comment[]>([])
const loading = ref(false)

const page_conf : PageConfig = reactive({
    current: 1,
    size: 10,
    total: 0,
    sort: [],
    strategy: ''
})
const commentQueryDTO : CommentQueryDTO = reactive({
    parent_id: undefined,
    article_pid: undefined,
})

const filterState = ref<0 | 1 | 2 | null>(null)
const searchQuery = ref('')
const dialogVisible = ref(false)
const editForm = reactive<EditForm>({
    commentId: '0',
    user: {
        nickname: '',
        email: '',
    },
    content: '',
    state: 0
})

// 生命周期钩子
onMounted(() => {
    fetchComments()
})

// 方法
const fetchComments = () => {
    loading.value = true
    queryCommentBackendPage(commentQueryDTO, page_conf).then((res)=>{
        page_conf.total = res.data.total
        comments.value.length = 0
        comments.value.push(...res.data.records)
    }).finally(()=>{
        loading.value = false
    })
}

const handleCurrentChange = (page: number) => {
    page_conf.current = page
    fetchComments()
}

const handleSizeChange = (size: number) => {
    page_conf.size = size
    fetchComments()
}

const getStateLabel = (state: 0 | 1 | 2) => {
    const stateMap = {
        0: '待审核',
        1: '已通过',
        2: '已拒绝'
    }
    return stateMap[state] || '未知'
}

const getStateTag = (state: 0 | 1 | 2) => {
    const tagMap = {
        0: 'warning',
        1: 'success',
        2: 'danger'
    }
    return tagMap[state] || 'info'
}

const formatDate = (date: Date) => {
    if (!date) return ''
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const approveComment = (row: Comment) => {
    ElMessageBox.confirm('确认通过该评论？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
    }).then(() => {
        releaseComment(row.commentId).then((res)=>{
            ElNotification.success(res.data)
        }).finally(()=>{
            fetchComments()
        })
    }).catch(() => {})
}

const rejectComment = (row: Comment) => {
    ElMessageBox.confirm('确认拒绝该评论？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        deactivateComment(row.commentId).then((res)=>{
            ElNotification.success(res.data)
        }).finally(()=>{
            fetchComments()
        })
    }).catch(() => {})
}

const editComment = (row: Comment) => {
    Object.assign(editForm, JSON.parse(JSON.stringify(row)))
    dialogVisible.value = true
}

const saveComment = () => {
    setTimeout(() => {
        const index = comments.value.findIndex(item => item.commentId === editForm.commentId)
        if (index !== -1) {
            comments.value[index].content = editForm.content
            comments.value[index].state = editForm.state
        }
        dialogVisible.value = false
        ElMessage.success('评论已更新')
    }, 300)
}

const removeComment = (row: Comment) => {
    ElMessageBox.confirm('确认删除该评论？此操作不可逆', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
    }).then(() => {
        deleteComment(row).then((res)=>{
            ElNotification.success(res.data)
        }).finally(()=>{
            fetchComments()
        })
    }).catch(() => {})
}
</script>

<style scoped>
.comment-management {
    padding: 20px;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.page-header h1 {
    margin: 0;
    color: var(--admin-text);
    font-size: 24px;
}

.filter-bar {
    display: flex;
    gap: 10px;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.user-details {
    display: flex;
    flex-direction: column;
}
.comment-list-card{
    background-color: var(--admin-bg-panel);
    box-shadow: var(--admin-card-shadow);
    border-radius: 8px;
    border: 1px solid var(--admin-border-color);
}

.user-nickname {
    font-weight: 500;
    color: var(--admin-text);
}

.user-email {
    font-size: 12px;
    color: var(--admin-sub-text);
}

.comment-content {
    display: flex;
    flex-direction: column;
}

.comment-content p {
    margin: 0 0 8px;
    color: var(--admin-text);
}

.comment-meta {
    display: flex;
    gap: 10px;
    font-size: 12px;
    color: var(--admin-sub-text);
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.el-button + .el-button {
    margin-left: 5px;
}
</style>

<style>
/* 适配暗色模式下的表格 */
:root .dark .el-table {
    background-color: var(--admin-bg-panel);
    color: var(--admin-text);
}

:root .dark .el-table th {
    background-color: var(--admin-bg-secondary);
    color: var(--admin-text);
}

:root .dark .el-table tr {
    background-color: var(--admin-bg-panel);
}

:root .dark .el-table--border td,
:root .dark .el-table--border th {
    border-color: var(--admin-border-color);
}

:root .dark .el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: var(--admin-bg-secondary);
}
</style>