import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import Article from "@/views/Article.vue";
import {PaginationStrategy} from "@/constant/app-key";
import Archive from "@/views/Archive.vue";
import Login from "@/components/backend/Login.vue";
import Backend from "@/views/Backend.vue";
import NotFound from "@/views/ErrorPage.vue";
import DashBoard from "@/components/backend/DashBoard.vue";
import ArticleBackend from "@/components/backend/ArticlePostPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            meta:{
                strategy: PaginationStrategy.DEFAULT_STRATEGY,
            },
            component: HomeView
        },
        {
            path: '/tag/:id',
            name: 'home_tag',
            meta:{
                strategy: PaginationStrategy.TAG_STRATEGY,
            },
            component: HomeView
        },
        {
            path: '/category/:id',
            name: 'home_category',
            meta:{
                strategy: PaginationStrategy.CATEGORY_STRATEGY,
            },
            component: HomeView
        },
        {
            path: '/search',
            name: 'search_result',
            meta:{
                strategy: PaginationStrategy.SEARCH_STRATEGY,
            },
            component: HomeView
        },
        {
            path: '/article/:id',
            name: 'article',
            component: Article,
        },
        {
            path: '/archive',
            name: 'archive',
            component: Archive
        },
        {
            path: '/admin/login',
            name: 'admin_login',
            component: Login
        },
        {
            path: '/admin',
            name: 'backend',
            component: Backend,
            children: [
                {
                    path: '/admin/dashboard',
                    name: 'admin_dashboard',
                    component: DashBoard
                },
                {
                    path: '/admin',
                    name: 'admin_dashboard_',
                    component: DashBoard
                },
                {
                    path: '/admin/posts',
                    name: 'admin_article',
                    component: ArticleBackend
                }
            ]
        },
        {
            path: '/:pathMatch(.*)',
            name: '404NotFound',
            component: NotFound
        }
    ]
})

export default router
