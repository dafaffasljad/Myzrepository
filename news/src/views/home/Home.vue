<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import axios from 'axios'
import Avatar from '@/assets/default.png'
import { useUserStore } from '@/stores';
import { ref, onMounted } from 'vue'

const loading=ref(false)
const newList = ref([])
const userStore = useUserStore()
// 欢迎
const welcomeText = ref('')
const welcome = () => {
    const time = new Date()
    // console.log(time.getHours());
    if (time.getHours() < 12) {
        welcomeText.value = '上午好'
    } else if (time.getHours() >= 12 && time.getHours() <= 18) {
        welcomeText.value = '下午好'
    } else {
        welcomeText.value = '晚上好'
    }
}
welcome()
// 渲染数据
onMounted(async () => {
    loading.value=true
    const res = await axios.get('http://localhost:3000/webapi/news/getNewsList')
    newList.value = res.data.data
    loading.value=false
    // console.log(res.data.data)
})


</script>

<template>
    <div class="box" >
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">新闻管理发布系统</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card" >
            <el-row>
                <el-col :span="4"><el-avatar :src="userStore.userInfo.avatar || Avatar" :size="150" /></el-col>
                <el-col :span="20">
                    <h1>{{ welcomeText }},{{ userStore.userInfo.username }},欢迎回来！</h1>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card2" v-loading="loading">
            <template #header>
                <div class="card-header">
                    <span>热点新闻</span>
                </div>
            </template>
            <!-- 轮播图 -->
            <el-carousel :interval="4000" type="card" height="320px">
                <el-carousel-item v-for="item in newList" :key="item._id">
                    <img :src="item.cover" class="image">
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.box {
    .box-card {
        margin-top: 15px;
        height: 25vh;
        line-height: 100%;

        h1 {
            font-size: 40px;
            line-height: 62px;
        }
    }

    .box-card2 {

        margin-top: 15px;

        .el-carousel__item h3 {
            color: #475669;
            opacity: 0.75;
            line-height: 200px;
            margin: 0;
            text-align: center;
        }

        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
            background-color: #d3dce6;
        }

        .image {
            width: 100%;
            height: 100%;
            background-size: cover;
        }
    }
}
</style>