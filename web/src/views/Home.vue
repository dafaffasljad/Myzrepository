<script setup>

import { useUserStore } from '@/stores'
import Avatar from '@/assets/default.png'
import { ref } from 'vue';
import { getUserInfoAPI } from '@/apis/user.js'
import { upload } from '@/apis/upload';


// 表单验证
const formModel = ref({})
const userStore = useUserStore();
const getUserInfo = async () => {
    const res = await getUserInfoAPI(userStore.userInfo._id)
    formModel.value = res.data.data[0]
    userStore.userInfo = res.data.data[0]
}
getUserInfo()


const rules = ref({
    password: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
})
// 性别
const options = ref([
    {
        value: 0,
        label: '无',
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
            const res = await upload('http://localhost:3000/adminapi/user/webUpload', formModel.value)
            ElMessage.success('修改资料成功！')
            if (res.data.ActionType === 'OK') {
                formModel.value = res.data.data
                getUserInfo()
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
    <NavBar></NavBar>
    <div style="margin-top: 80px;">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :src="formModel.avatar || Avatar" :size="150" />
                    <div>{{ formModel.username }}</div>
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
                            <el-input v-model="formModel.username" disabled :value="formModel.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="formModel.password" :value="formModel.password"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="formModel.gender" class="m-2" placeholder="保密" style="width: 100%;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="头像" prop="gender">
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