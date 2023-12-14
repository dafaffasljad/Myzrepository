<script setup>
import { Menu, CaretBottom } from '@element-plus/icons-vue';
import Avatar from '@/assets/default.png'
import router from '@/router'
import { useUserStore } from '@/stores';

// 获取基础数据
const userStore = useUserStore()

// dorp栏操作
const handleCommand = (key) => {
    if (key === 'login') {
        // 清空本地
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push(`/${key}`)
    } else {
        router.push(`/${key}`)
    }
}

</script>

<template>
    <el-header class="header">
        <div class="left">
            <el-icon>
                <Menu />
            </el-icon>
            <span style="margin-left: 30px;">新闻管理发布系统</span>
        </div>
        <div class="right">
            <el-avatar :src="userStore.userInfo.avatar || Avatar" style="margin-right: 15px;" />
            <span style="margin-right: 20px;">{{ userStore.userInfo.username || '未定义' }}</span>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown__box">
                    <el-icon>
                        <CaretBottom />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="center">个人中心</el-dropdown-item>
                        <el-dropdown-item command="login">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    // background-color: #2d3a4b;
    // background-image: linear-gradient(to right, white, skyblue);
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
        }}

        .left {
            display: flex;

            i {
                margin: auto;
            }
        }

        .right {
            display: flex;
            align-items: center;

            .el-dropdown {
                margin: auto;
            }
        }

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: black;
                // margin-left: 5px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }
</style>