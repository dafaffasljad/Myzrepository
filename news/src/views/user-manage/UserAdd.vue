<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { upload } from '@/util/upload'
import router from '@/router'

const options = ref([
    {
        value: 1,
        label: '管理员',
    },
    {
        value: 2,
        label: '编辑者',
    }
])
// 规则
const formRef = ref()
const formModel = ref({
    username: '',
    password: '',
    role: 2,
    introduction: '',
    avatar: '',
    file: null,
    gender: 0
})
const rules = ref({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择角色', trigger: 'blur' }
    ],
    introduction: [
        { required: true, message: '简介不能为空', trigger: 'blur' }
    ],
    avatar: [
        { required: true, message: '头像不能为空', trigger: 'blur' }
    ],
})
// 上传图片
const handleChange = (file) => {
    formModel.value.avatar = URL.createObjectURL(file)
    formModel.value.file = file
}
// 提交
const submitForm = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const res = await upload('http://localhost:3000/adminapi/user/add', formModel.value)
            if (res.data.ActionType === 'OK') {
                ElMessage.success('添加用户成功！')
                router.push('/user-manage/userList')
            }
        }
    })
}
</script>

<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">新闻管理发布系统</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加用户</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :model="formModel" :rules="rules" ref="formRef" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formModel.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formModel.password"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="formModel.role" class="m-2" style="width: 100%;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="简介" prop="introduction">
                    <el-input type="textarea" v-model="formModel.introduction"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <Upload v-model="formModel.avatar" :avatar="formModel.avatar" @uploadChange="handleChange"></Upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">添加</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.el-card {
    margin-top: 15px;
    height: 80vh;
}
</style>