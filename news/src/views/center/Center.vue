<script setup>
import { ArrowRight } from '@element-plus/icons-vue'

import Avatar from '@/assets/default.png'
import { useUserStore } from '@/stores';
import { ref } from 'vue';

import { upload } from '@/util/upload';

const userStore = useUserStore()
// const { username, introduction } = userStore.userInfo
// 表单验证
const formModel = ref({
    username: userStore.userInfo.username,
    gender: userStore.userInfo.gender,
    introduction: userStore.userInfo.introduction,
    avatar: userStore.userInfo.avatar,
    file: null
})
const rules = ref({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
})
// 性别
const options = ref([
    {
        value: 0,
        label: '保密',
    },
    {
        value: 1,
        label: '男',
    },
    {
        value: 2,
        label: '女',
    }
])

// 提交上传
const formRef = ref()
const submitUpload = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            console.log(formModel.value);
            const res = await upload('http://localhost:3000/adminapi/user/upload', formModel.value)

            ElMessage.success('修改资料成功！')
            if (res.data.ActionType === 'OK') {
                userStore.userInfo.username = res.data.data.username
                userStore.userInfo.gender = res.data.data.gender
                userStore.userInfo.introduction = res.data.data.introduction
                userStore.userInfo.avatar = res.data.data.avatar
                console.log(res.data.data);

            }
        }
    })
}
const handleChange = (file) => {
    formModel.value.avatar = URL.createObjectURL(file)
    formModel.value.file = file
}
</script>

<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">新闻管理发布系统</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/center' }">个人中心</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :src="userStore.userInfo.avatar || Avatar" :size="150" />
                    <h3>{{ userStore.userInfo.username }}</h3>
                    <h1>{{userStore.userInfo.role===1?'管理员':'编辑者'}}</h1>
                </el-card>
            </el-col>
            <!-- 表单 -->
            <el-col :span="16">
                <el-card class="box-card2">
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <el-form :model="formModel" :rules="rules" label-width="100px" ref="formRef">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="formModel.username" :value="userStore.userInfo.username"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="formModel.gender" class="m-2" placeholder="保密" style="width: 100%;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="简介" prop="introduction">
                            <el-input type="textarea" v-model="formModel.introduction"></el-input>
                        </el-form-item>
                        <el-form-item label="头像" prop="introduction">
                            <Upload :avatar="formModel.avatar" @uploadChange="handleChange"></Upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitUpload">
                                上传
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss" scoped>
.el-row {
    margin-top: 15px;

    .box-card {
        text-align: center;
    }

    .box-card2 {
        height: 80vh;
    }
}
</style>