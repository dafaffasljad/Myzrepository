<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import router from '../router';

const route = useRoute()
const state = ref(false)
const logout = () => {
    ElMessage.success("退出成功！")
    localStorage.removeItem("token")
    router.push('login')
}
</script>

<template>
    <div class="navbar">
        <el-menu :default-active="route.fullPath" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="/news">新闻首页</el-menu-item>
            <el-menu-item index="/home">个人中心</el-menu-item>
            <el-menu-item index="/login" v-if="state">登录/注册</el-menu-item>
            <el-menu-item index="/login" @click="logout" v-else>退出登录</el-menu-item>
            <div class="right">企业官网</div>
        </el-menu>
    </div>
</template>

<style lang="scss" scoped>
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;

    // .el-menu {
    //     background: linear-gradient(90deg,
    //             white,
    //             skyblue);
    //     background-size: 400%;
    //     animation: myanimation 10s infinite;

    //     @keyframes myanimation {
    //         0% {
    //             background-position: 0% 50%;
    //         }

    //         50% {
    //             background-position: 100% 50%;
    //         }

    //         100% {
    //             background-position: 0% 50%;
    //         }
    //     }
    // }

    .right {
        position: fixed;
        top: 0;
        right: 30px;
        widows: 100px;
        height: 59px;
        line-height: 59px;
    }

}
</style>