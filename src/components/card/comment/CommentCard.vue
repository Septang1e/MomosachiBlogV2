<script setup lang="ts">
import {ref, onMounted, nextTick, watch} from 'vue'
import type {Comment, CommentQueryDTO} from "@/api/comment/types/comment";
import CommentSubmitCard from "@/components/card/comment/CommentSubmitCard.vue";
import {useAppStore} from "@/stores";
import ReplyCard from "@/components/card/comment/ReplyCard.vue";
import CommentItem from "@/components/card/comment/CommentItem.vue";
import type {PageConfig} from "@/api/page";
import {reactive} from "vue";
import {queryCommentPage} from "@/api/comment";
import {useRoute} from "vue-router";
const route = useRoute()

const props = defineProps<{
    articlePid: string
}>()

const emptyForm = ref<Comment>({
    articlePid: "", state: 0,
    commentId: '123',
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

const appStore = useAppStore()
const comments = ref<Comment[]>([])
const loading = ref(false)
const totalComment = ref(0)
const hasMore = ref(true)

const page_conf : PageConfig = reactive({
    current: 1,
    size: 10,
    strategy: '',
    total: 0,
    sort: []
})
const commentQueryDTO : CommentQueryDTO = reactive({
    article_pid: <string>props.articlePid,
    parent_id: undefined
})

const queryCommentData = () => {
    queryCommentPage(commentQueryDTO, page_conf).then((res) => {
        page_conf.total = res.data.total
        comments.value.push(...res.data.records)
        hasMore.value = page_conf.current * page_conf.size < page_conf.total
    })
}

function onSubmitted(comment : Comment) {

}


function initData() {
    page_conf.current = 1
    console.log(props)
}

// 提交评论
onMounted(()=>{
    initData()
    queryCommentData()
})
</script>

<template>
    <div class="comment-card">
        <div class="comment-title-wrap">
            <h3 class="comment-title">{{totalComment}}条评论</h3>
            <el-icon/>
        </div>

        <CommentSubmitCard
            v-if="appStore.getReplyTo() === ''"
            :article-pid="<string>commentQueryDTO.article_pid" :reply-to="undefined" :parent-id="undefined"
        />

        <div class="comment-list" v-loading="loading">
            <div
                v-for="comment in comments"
                :key="comment.commentId"
                :data-pid="comment.commentId"
                class="comment-item-wrap"
            >

                <div class="main-comment">

                    <CommentItem
                        :comment="comment"
                    />

                    <CommentSubmitCard
                        v-if="appStore.getReplyTo() === comment.commentId"
                        :article-pid="comment.articlePid" :reply-to="comment.commentId" :parent-id="comment.commentId"
                        @onSubmitted="onSubmitted"
                    />

                    <div class="sub-comment">
                        <ReplyCard :article-pid="<string>comment.articlePid" :parent-id="comment.commentId"/>
                    </div>

                </div>

                <div class="has-more">
                    
                </div>
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

.comment-title-wrap{
    display: flex;
    align-items: center;
}

.comment-list {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.comment-item-wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: var(--var-c-bg-secondary);
    border-radius: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.comment-item-wrap:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.website a {
    color: var(--var-c-hover-text);
    text-decoration: none;
}

.website a:hover {
    text-decoration: underline;
}



.comment-form *{
    color: var(--var-c-text) !important;
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

.sub-comment {
    margin: 12px 0 0 32px;
    padding-left: 16px;
    position: relative;
}
</style>