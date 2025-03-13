<!-- ReplyList.vue -->
<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import { ElMessage } from 'element-plus'
import type {Comment, CommentQueryDTO} from "@/api/comment/types/comment"
import CommentItem from './CommentItem.vue'
import type {PageConfig} from "@/api/page";
import {reactive} from "vue";
import CommentSubmitCard from "@/components/card/comment/CommentSubmitCard.vue";
import {useAppStore} from "@/stores";
import {queryCommentPage} from "@/api/comment";
import markdownIt from "@/utils/markdown-it";

const props = defineProps<{
    parentId: string
    articlePid: string
}>()
const appStore = useAppStore()

const page_conf : PageConfig = reactive({
    current: 1,
    size: 10,
    strategy: '',
    total: 0,
    sort: []
})
const commentQueryDTO : CommentQueryDTO = {
    article_pid: <string>props.articlePid,
    parent_id: <string>props.parentId
}

const emptyForm = ref<Comment>({
    articlePid: "", state: 0,
    commentId: '12435',
    content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    parentId: '',
    replyTo: 'aaaaaaa',
    createTime: Date.now(),
    updateTime: Date.now(),
    likes: 66,
    user: {
        uid: '',
        nickname: 'cscscscsc',
        avatar: '',
        email: '',
        website: 'www.github.com'
    }
})
const replies = ref<Comment[]>([])
const loading = ref(false)
const hasMore = ref(false)
const showComment = ref(false)

function toggleReplyVisibility() {
    showComment.value = !showComment.value
    commentToggleIconStyle.value = showComment.value ? 'transform: rotate(-180deg);' : ''
}

const commentToggleIconStyle = ref("")

const fetchReplies = async () => {
    try {
        loading.value = true

        queryCommentPage(commentQueryDTO, page_conf).then((res)=>{
            page_conf.total = res.data.total
            replies.value.push(...res.data.records)
            hasMore.value = !(page_conf.current  * page_conf.size >= page_conf.total)

            // for(let item of replies.value) {
            //     item.content = markdownIt.render(item.content)
            // }

        })

    } catch (e) {
        ElMessage.error('获取回复失败')
    } finally {
        loading.value = false
    }
}

const fetchReplyTo = () : string => {
    return ''
}

const loadMore = () => {
    page_conf.current++
    fetchReplies()
}

onMounted(() => {
    fetchReplies()
})
</script>

<template>
    <button class="show-comment-btn" @click="toggleReplyVisibility" v-if="replies.length > 0">
        <el-icon class="bx bx-chevron-down" :style="commentToggleIconStyle" size="20"/>
        {{page_conf.total}}条评论
    </button>
    <div class="reply-list" v-if="showComment">
        <div v-for="reply in replies" :key="reply.commentId" class="reply-item">
            <CommentItem :comment="reply" :article-pid="articlePid" />
            <CommentSubmitCard v-if="appStore.getReplyTo() === reply.commentId" :article-pid="reply.articlePid" :reply-to="reply.commentId" :parent-id="parentId"/>
        </div>
        <div v-if="hasMore" class="load-more">
            <button class="load-more-btn" @click="loadMore">
                <el-icon class=""/>
                显示更多回复
            </button>
        </div>
    </div>
</template>

<style scoped>
.reply-item {
    margin-bottom: 0.2rem;
}
.load-more{
    margin-left: 8px;
}
.load-more *{
    font-size: 12px;
}
.show-comment-btn{
    font-size: 14px;
    background-color: transparent;
    color: var(--var-c-hover-text);
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.show-comment-btn *{
    transition: transform ease-in-out 0.4s;
}
.show-comment-btn:hover{
    background-color: var(--var-c-hover-bg);
}

.load-more-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 14px;
    font-size: 14px;
    color: var(--var-c-hover-text);
}
.load-more-btn:hover{
    background-color: var(--var-c-hover-bg);
}
</style>

<style>

.reply-list .load-more .el-button{
    background-color: var(--var-c-hover-bg);
    color: var(--var-c-text);
    border: var(--var-c-hover-text);
}

</style>