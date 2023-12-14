<script setup>
import { HomeFilled, Avatar, User, Message, ChatDotRound, Star, Histogram } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router';
const route = useRoute()
const userStore = useUserStore()
// 权限视图
const vAdmin = {
    mounted(el) {
        // console.log(el);
        if (userStore.userInfo.role !== 1) {
            el.parentNode.removeChild(el)
        }
    }
}
</script>

<template>
    <el-aside width="200px">
        <el-menu :router="true" :default-active="route.fullPath">
            <div class="el-aside__logo"></div>
            <!-- 首页 -->
            <el-menu-item index="/">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </el-menu-item>
            <!-- 个人中心 -->
            <el-menu-item index="/center">
                <el-icon>
                    <Avatar />
                </el-icon>
                <span>个人中心</span>
            </el-menu-item>
            <!-- 热度排行 -->
            <el-menu-item index="#">
                <el-icon>
                    <Histogram />
                </el-icon>
                <span>热度排行</span>
            </el-menu-item>
            <!-- 用户管理 -->
            <el-sub-menu index="/user-manage" v-admin>
                <template #title>
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/user-manage/addUser">添加用户</el-menu-item>
                <el-menu-item index="/user-manage/userList">用户列表</el-menu-item>
            </el-sub-menu>
            <!-- 新闻管理 -->
            <el-sub-menu index="/news-manage">
                <template #title>
                    <el-icon>
                        <Message />
                    </el-icon>
                    <span>新闻管理</span>
                </template>
                <el-menu-item index="/news-manage/addNews">创建新闻</el-menu-item>
                <el-menu-item index="/news-manage/newsList">新闻列表</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/commentList">
                <el-icon>
                    <ChatDotRound />
                </el-icon>
                <span>评论管理</span>
            </el-menu-item>
            <el-menu-item index="/likeList">
                <el-icon>
                    <Star />
                </el-icon>
                <span>点赞管理</span>
            </el-menu-item>
            <!-- <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon>
                        <Reading />
                    </el-icon>
                    <span>产品管理</span>
                </template>
                <el-menu-item index="/product-manage/addProduct">添加产品</el-menu-item>
                <el-menu-item index="/product-manage/productList">产品列表</el-menu-item>
            </el-sub-menu> -->
        </el-menu>

    </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
    &__logo {
        width: 143px;
        height: 120px;
        background: url('@/assets/badge.png') no-repeat center / 120px auto;
        margin-bottom: 18px;
        background-size: 240px;
    }

    .el-menu {
        height: 100vh;
        // background-image: linear-gradient(to bottom, white, white, skyblue);
        background: linear-gradient(90deg,
                white,
                skyblue);
        background-size: 400%;
        animation: myanimation 10s infinite;

        @keyframes myanimation {
            0% {
                background-position: 0% 50%;
            }

            50% {
                background-position: 100% 50%;
            }

            100% {
                background-position: 0% 50%;
            }
        }

    }
}
</style>