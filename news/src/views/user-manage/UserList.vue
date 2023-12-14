<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { getUserList, delUserList, getUserInfo, upUserInfo } from '@/util/user'
import { onMounted, ref } from 'vue';
import defaultAvatar from '@/assets/default.png'

// 用户列表
const userList = ref([])
const getList = async () => {
    const res = await getUserList()
    // console.log(res);
    userList.value = res.data.data
}
onMounted(() => {
    getList()
})
// 编辑
const dialogVisible = ref(false)
const handleEdit = async (row) => {
    dialogVisible.value = true
    const res = await getUserInfo(row._id)
    formModel.value = res.data.data[0]
}
// 编辑确认
const handleEditConfirm = async () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            console.log(formModel.value);
            await upUserInfo(formModel.value)
            ElMessage.success('编辑成功！')
            dialogVisible.value = false
            getList()
        }
    })
}
// 删除
const handleDelete = async (row) => {
    await ElMessageBox.confirm('你确定要删除吗？', '温馨提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        lockScroll: false
    })
    await delUserList(row._id)
    ElMessage.success('删除成功！')
    getList()
    // console.log(res);
    // console.log(row);
}
// 校验规则 form
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
const formRef = ref()
const formModel = ref({
    username: '',
    password: '',
    role: 2,
    introduction: ''
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
    ]
})
</script>

<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">新闻管理发布系统</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table :data="userList" style="width: 100%" stripe>
                <el-table-column prop="username" label="用户名" width="300" />
                <el-table-column prop="avatar" label="头像" width="300">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50" :src="defaultAvatar"></el-avatar>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="role" label="角色" width="300">
                    <template #default="{ row }">
                        <el-tag v-if="row.role === 1" class="ml-2" type="danger">管理员</el-tag>
                        <el-tag v-else-if="row.role===2" class="ml-2" type="success">编辑者</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>
        <!-- dialog -->
        <el-dialog v-model="dialogVisible" title="编辑用户" width="40%" :lock-scroll="false">
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
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.el-card {
    margin-top: 15px;
    height: 80vh;
}
</style>