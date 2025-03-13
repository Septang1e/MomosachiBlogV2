<script lang="ts" setup>
import CommentSubmitCard from "@/components/card/comment/CommentSubmitCard.vue";
import type {Comment} from "@/api/comment/types/comment";
import {useAppStore} from "@/stores";
import AdminAvatar from "@/assets/resource/avatar.jpg"

const props = defineProps<{
  comment: Comment;
}>();
const appStore = useAppStore()



const formatTime = (timestamp: number): string => {
    if (!timestamp) return '';

    const now = new Date();
    const commentDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return commentDate.toLocaleDateString();
};

const formatWebsite = (website: string): string => {
    if (!website) return '';

    try {
        const url = new URL(website);
        return url.hostname;
    } catch {
        return website;
    }
};

const formatUrl = (website : string) : string => {

    if(!website.startsWith("http://") && !website.startsWith("https://")) {
        website = `https://${website}`
    }

    return website

}

const formatContent = (content: string): string => {
  if (!content) return '';

  // Handle @ mentions - this replaces @username with a styled span
  const mentionRegex = /@([a-zA-Z0-9_-]+)/g;
  return content.replace(mentionRegex, '<span class="mention">@$1</span>');
};

const handleReply = () => {

    if(appStore.getReplyTo() === props.comment.commentId) {
        appStore.setReplyTo('')
        return
    }
    appStore.setReplyTo(props.comment.commentId)
}

</script>

<template>
  <div class="comment-item">
    <div class="avatar-container">
        <img
            :src="AdminAvatar"
            alt="User Avatar"
            class="avatar" />
    </div>

    <div class="comment-content">
      <div class="comment-header">
        <span class="username">@{{ comment.user.nickname }}</span>
        <span class="website" v-if="comment.user.website">
          <a :href="formatUrl(comment.user.website)" target="_blank" rel="noopener noreferrer">
            {{ formatWebsite(comment.user.website) }}
          </a>
        </span>
        <span class="time">{{ formatTime(comment.createTime) }}</span>
      </div>

      <div class="comment-text" v-html="formatContent(comment.content)"></div>

      <div class="comment-actions">
<!--        <button class="action-button like-button">-->
<!--          <el-icon class="bx bx-like"/>-->
<!--          <span v-if="comment.likes >= 0">{{ comment.likes }}</span>-->
<!--        </button>-->
        <button class="action-button reply-button" @click="handleReply">
          {{ comment.commentId === appStore.getReplyTo() ? '取消回复' : '回复' }}
        </button>
      </div>

      <div v-if="appStore.getReplyTo() === comment.replyTo" class="reply-form">
        <CommentSubmitCard :article-pid="comment.articlePid" :reply-to="comment.commentId" :parent-id="comment.parentId"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-item {
    display: flex;
    padding: 16px 0;
    color: var(--var-c-text);
}

.avatar-container {
    margin-right: 16px;
    flex-shrink: 0;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.comment-content {
    flex: 1;
    min-width: 0;
}

.comment-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 4px;
}

.username {
    font-weight: 500;
    margin-right: 8px;
    cursor: pointer;
}

.website {
    margin-right: 8px;
}

.website a {
    color: var(--var-c-sub-text);
    text-decoration: none;
}

.website a:hover {
    color: var(--var-c-hover-text);
    text-decoration: underline;
}

.time {
    color: var(--var-c-sub-text);
    font-size: 0.9em;
    cursor: pointer;
}

.comment-text {
    margin-bottom: 8px;
    word-break: break-word;
    line-height: 1.4;
}

.mention {
    color: var(--var-c-hover-text);
    font-weight: 500;
}

.comment-actions {
    display: flex;
    align-items: center;
    margin-top: 8px;
}

.action-button {
    background: none;
    border: none;
    padding: 6px 12px;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 16px;
    color: var(--var-c-sub-text);
    display: flex;
    align-items: center;
    font-size: 0.9em;
}

.action-button:hover {
    background-color: var(--var-c-hover-bg);
    color: var(--var-c-hover-text);
}

.like-icon {
    margin-right: 4px;
    font-size: 0.9em;
}

.reply-form {
    margin-top: 16px;
}
</style>