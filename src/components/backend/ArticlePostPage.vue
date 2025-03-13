<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import {ElMessage, ElMessageBox, type FormInstance, type FormRules} from 'element-plus'
import { Plus, Edit, Delete, View } from '@element-plus/icons-vue'
import _ from "lodash";
import type {ArticleAggregates} from "@/api/article/types/article";

// MdEditor

import 'md-editor-v3/lib/style.css';
import { MdEditor } from 'md-editor-v3';



// 状态定义
const loading = ref(false)
const saveLoading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalArticles = ref(0)
const articleFormRef = ref<FormInstance>()
import { ElTag } from 'element-plus'

// 数据列表
const articles = ref<ArticleAggregates[]>([])


// 表单数据
const articleForm = ref<ArticleAggregates>({
    article: {
        pid: '',
        title: '',
        content: '',
        cover: '',
        viewCount: 0,
        likeCount: 0,
        heat: 0,
        setTop: 0,
        state: 0,
        createTime: '',
        updateTime: '',
        description: ''
    },
    tags: [
        {pid: '', name: '', state: 1, articleCount: 0},
        {pid: '', name: '', state: 1, articleCount: 0}
    ],
    category: {pid: '', name: '', state: 0, articleCount: 0}
})

const emptyForm = ref<ArticleAggregates>({
    article: {
        pid: '',
        title: '',
        content: '',
        cover: '',
        viewCount: 0,
        likeCount: 0,
        heat: 0,
        setTop: 0,
        state: 0,
        createTime: '',
        updateTime: '',
        description: ''
    },
    tags: [
        {pid: '', name: '', state: 0, articleCount: 0},
        {pid: '', name: '0', state: 0, articleCount: 0}
    ],
    category: {pid: '', name: '', state: 0, articleCount: 0}
})

// 表单验证规则
const articleRules = reactive<FormRules>({
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' },
        { min: 2, max: 100, message: '标题长度应在2-100个字符之间', trigger: 'blur' }
    ],
    categoryId: [
        { required: true, message: '请选择文章分类', trigger: 'change' }
    ],
    tagIds: [
        { required: true, message: '请至少选择一个标签', trigger: 'change' },
        { type: 'array', min: 1, message: '请至少选择一个标签', trigger: 'change' }
    ],
    content: [
        { required: true, message: '请输入文章内容', trigger: 'blur' }
    ],
    description: [
        { required: true, message: '请输入文章简介', trigger: 'blur' },
        { max: 200, message: '简介不能超过200个字符', trigger: 'blur' }
    ]
})

// 生命周期钩子
onMounted(() => {
    fetchData()
})

// 获取文章列表
const fetchData = () => {

    articles.value.push(...[
        {
            article: {
                pid: 'art001',
                title: '如何提高Vue3性能：10个实用技巧',
                content: '<p>Vue 3是现代前端开发中最流行的框架之一，但如果使用不当，可能会导致性能问题。本文将介绍10个提高Vue应用性能的实用技巧...</p>',
                cover: 'https://example.com/images/vue-performance.jpg',
                viewCount: 1250,
                likeCount: 78,
                heat: 89,
                setTop: 1,
                state: 1,
                createTime: '2025-02-15 14:30:22',
                updateTime: '2025-03-05 09:12:45',
                description: 'Vue3性能优化的完整指南，包含代码分割、虚拟列表、defineAsyncComponent等多种技巧'
            },
            tags: [
                {pid: 'tag001', name: 'Vue', state: 1, articleCount: 32},
                {pid: 'tag002', name: '性能优化', state: 1, articleCount: 18}
            ],
            category: {pid: 'cat001', name: '前端开发', state: 1, articleCount: 45}
        }
    ])
}

function openEditArticleDialog(index: number) {
    console.log(index)
    isEdit.value = true
    console.log(articles.value[index])
    articleForm.value = _.cloneDeep(articles.value[index])
    dialogVisible.value = true
}

function openAddArticleDialog() {
    isEdit.value = false
    articleForm.value = _.cloneDeep(emptyForm.value)
    dialogVisible.value = true
}


function deleteArticle(pid: string) {

}

function handleSizeChange() {

}
function handleCurrentChange(current: number) {

}

function handleCoverSuccess() {

}

function beforeCoverUpload() {

}

function saveArticle() {

}

// 新增状态
const tagInput = ref('')
const categoryInput = ref('')

// 修改标签处理逻辑
const handleTags = {
    addTag() {
        if (tagInput.value.trim()) {
            const newTag = {
                pid: `tag_${Date.now()}`,
                name: tagInput.value.trim(),
                state: 1,
                articleCount: 0
            }
            articleForm.value.tags.push(newTag)
            tagInput.value = ''
        }
    },
    removeTag(index: number) {
        articleForm.value.tags.splice(index, 1)
    }
}

// 修改分类处理
const handleCategory = {
    updateCategory() {
        articleForm.value.category = {
            pid: `cat_${Date.now()}`,
            name: categoryInput.value.trim(),
            state: 1,
            articleCount: 0
        }
    }
}


</script>

<template>
    <div class="content-management">
        <div class="page-header">
            <h1>内容管理</h1>
            <el-button type="primary" @click="openAddArticleDialog()" :icon="Plus">添加文章</el-button>
        </div>

        <el-card class="table-container">
            <el-table
                :data="articles"
                style="width: 100%"
                border
                v-loading="loading"
            >
                <el-table-column label="文章标题" min-width="180">
                    <template #default="props">
                        <div class="article-title">
                            <el-tag v-if="props.row.article.setTop === 1" type="danger" effect="dark" size="small">置顶</el-tag>
                            {{ props.row.article.title }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="分类" width="120">
                    <template #default="props">
                        <el-tag>{{ props.row.category.name }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="标签" min-width="150">
                    <template #default="{ row }">
                        <el-tag
                            v-for="tag in row.tags"
                            :key="tag.pid"
                            class="tag-item"
                            effect="plain"
                            size="small"
                        >
                            {{ tag.name }}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="阅读量" width="100" prop="article.viewCount" sortable />
                <el-table-column label="点赞" width="80" prop="article.likeCount" sortable />
                <el-table-column label="热度" width="80" prop="article.heat" sortable />

                <el-table-column label="状态" width="100">
                    <template #default="props">
                        <el-tag :type="props.row.article.state === 1 ? 'success' : 'info'">
                            {{ props.row.article.state === 0 ? '已发布' : '草稿' }}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="创建时间" width="180" prop="article.createTime" sortable />

                <el-table-column label="操作" width="200" fixed="right">
                    <template #default="props">
                        <el-button-group>
                            <el-button size="small" type="primary" @click="openEditArticleDialog(props.$index)" :icon="Edit">编辑</el-button>
<!--                            <el-button size="small" type="info" @click="previewArticle(row)" :icon="View">预览</el-button>-->
                            <el-popconfirm
                                title="确定要删除这篇文章吗？"
                                @confirm="deleteArticle(props.row.article.pid)"
                                confirm-button-text="确定"
                                cancel-button-text="取消"
                            >
                                <template #reference>
                                    <el-button size="small" type="danger" :icon="Delete">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-container">
                <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 50, 100]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalArticles"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </el-card>

        <!-- 文章编辑对话框 -->
        <el-dialog
            v-model="dialogVisible"
            :title="isEdit ? '编辑文章' : '新增文章'"
            width="80%"
            destroy-on-close
            class="article-dialog"
        >
            <el-form
                ref="articleFormRef"
                label-width="100px"
                class="article-form"
                :model="articleForm"
                :rules="articleRules"
            >

                <el-form-item label="封面图">
                    <el-upload
                        class="cover-uploader"
                        action="/api/upload"
                        :show-file-list="false"
                        :on-success="handleCoverSuccess"
                        :before-upload="beforeCoverUpload"
                    >
                        <el-image v-if="articleForm.article.cover" :src="articleForm.article.cover" class="cover-image" />
                        <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>


                <el-form-item label="文章标题" prop="article.title">
                    <el-input
                        v-model="articleForm.article.title"
                        placeholder="请输入文章标题"
                        class="title-input"
                    />
                </el-form-item>

                <div class="article-status">
                    <el-form-item label="发布状态">
                        <el-switch
                            v-model="articleForm.article.state"
                            :active-value="1"
                            :inactive-value="0"
                            active-text="发布"
                            inactive-text="草稿"
                        />
                    </el-form-item>

                    <el-form-item label="是否置顶">
                        <el-switch
                            v-model="articleForm.article.setTop"
                            :active-value="1"
                            :inactive-value="0"
                            active-text="置顶"
                            inactive-text="普通"
                        />
                    </el-form-item>
                </div>

                <el-form-item label="分类" prop="category.name">
                    <el-input
                        v-model="articleForm.category.name"
                        placeholder="输入分类名称"
                        @blur="handleCategory.updateCategory"
                    />
                </el-form-item>


                <el-form-item label="标签">
                    <div class="tags-container">
                        <div class="selected-tags">
                            <el-tag
                                v-for="(tag, index) in articleForm.tags"
                                :key="tag.pid"
                                closable
                                @close="handleTags.removeTag(index)"
                                class="tag-item"
                            >
                                {{ tag.name }}
                            </el-tag>
                        </div>
                        <div class="tag-input">
                            <el-input
                                v-model="tagInput"
                                placeholder="输入标签后回车"
                                @keyup.enter="handleTags.addTag"
                            >
                                <template #append>
                                    <el-button
                                        icon="Plus"
                                        @click="handleTags.addTag"
                                    />
                                </template>
                            </el-input>
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="文章简介" prop="article.description">
                    <el-input
                        v-model="articleForm.article.description"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入文章简介"
                        maxlength="200"
                        show-word-limit
                        class="description-input"
                    />
                </el-form-item>

                <el-form-item label="文章内容">
                    <div class="editor-container">
                        <MdEditor v-model="articleForm.article.content"/>
                        <el-input
                            v-model="articleForm.article.content"
                            type="textarea"
                            :rows="15"
                            placeholder="请输入文章内容"
                        />
                    </div>
                </el-form-item>

            </el-form>

            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveArticle" :loading="saveLoading">保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>

.article-dialog {
    :deep(.el-dialog) {
        background: var(--admin-bg-panel);
        border-radius: 12px;
        border: 1px solid var(--admin-border-color);
        box-shadow: var(--admin-card-shadow);

        .el-dialog__header {
            border-bottom: 1px solid var(--admin-divider);
            margin-right: 0;

            .el-dialog__title {
                color: var(--admin-text);
                font-size: 18px;
                font-weight: 600;
            }
        }

        .el-dialog__body {
            padding: 20px;
        }

        .el-dialog__footer {
            border-top: 1px solid var(--admin-divider);
            padding: 16px 20px;
        }
    }
}

.tags-container {
    border: 1px solid var(--admin-border-color);
    border-radius: 4px;
    padding: 8px;
    background: var(--admin-bg-secondary);
    width: 100%;

    .selected-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 8px;

        .tag-item {
            background: var(--admin-tag-bg);
            color: var(--admin-tag-text);
            border-color: var(--admin-border-color);
            transition: all 0.2s ease;

            &:hover {
                opacity: 0.8;
                transform: translateY(-1px);
            }
        }
    }

    .tag-input {
        .el-input {
            :deep(.el-input__inner) {
                background: transparent;
                border: none;
                box-shadow: none;
                padding-left: 0;

                &:focus {
                    box-shadow: none;
                }
            }

            :deep(.el-input-group__append) {
                background: transparent;
                border: none;
                padding: 0 10px;
            }
        }
    }
}

.title-input {
    :deep(.el-input__inner) {
        font-size: 16px;
        font-weight: 500;
        height: 40px;
    }
}

.description-input {
    :deep(.el-textarea__inner) {
        background: var(--admin-bg-secondary);
        border: 1px solid var(--admin-border-color);
        resize: none;
    }
}


.content-management {
    padding: 20px;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.page-header h1 {
    font-size: 24px;
    font-weight: 600;
    color: var(--admin-text);
    margin: 0;
}

.table-container {
    background-color: var(--admin-bg-panel);
    box-shadow: var(--admin-card-shadow);
    border-radius: 8px;
    border: 1px solid var(--admin-border-color);
}

.article-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
}

.tag-item {
    margin-right: 6px;
    margin-bottom: 4px;
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

/* 表单样式 */
.article-form {
    padding: 20px 10px;
}

.cover-uploader {
    display: block;
    width: 200px;
    height: 150px;
    border: 1px dashed var(--admin-border-color);
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
}

.cover-uploader:hover {
    border-color: var(--admin-primary-blue);
}

.cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cover-uploader-icon {
    font-size: 28px;
    color: var(--admin-sub-text);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.editor-container {
    border: 1px solid var(--admin-border-color);
    border-radius: 4px;
    width: 100%;
}

/* 预览样式 */
.article-preview {
    padding: 20px;
}

.preview-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--admin-text);
}

.preview-info {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    font-size: 14px;
    color: var(--admin-sub-text);
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--admin-divider);
}

.preview-content {
    font-size: 16px;
    line-height: 1.6;
    color: var(--admin-text);
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
    .content-management {
        padding: 10px;
    }

    .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .article-form {
        padding: 10px 0;
    }
}

/* 明暗主题过渡动画 */
.content-management,
.el-card,
.el-dialog,
.el-form-item {
    transition: all 0.3s ease;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: var(--admin-primary-blue);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--admin-blue-dark);
}
.article-status{
    display: flex;
    align-items: center;
}
</style>