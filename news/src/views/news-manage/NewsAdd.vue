<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { upload } from '@/util/upload'
import router from '@/router'
// 校验规则
const formRef = ref()
const formModel = ref({
    title: '',
    content: '',
    category: 1,// 1最新动态 2典型案例 3通知公告
    cover: '',
    file: null,
    isPublic: 0 // 0未发布，1已发布
})
const rules = ref({
    title: [
        { required: true, message: '输入不能为空', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '输入不能为空', trigger: 'blur' }
    ],
    category: [
        { required: true, message: '输入不能为空', trigger: 'blur' }
    ],
    cover: [
        { required: true, message: '输入不能为空', trigger: 'blur' }
    ]
})
// 文本变化
const handleChange = (data) => {
    // console.log(data);
    formModel.value.content = data
}
// 类别
const options = ref([
    {
        value: 1,
        label: '最新动态',
    },
    {
        value: 2,
        label: '典型案例',
    },
    {
        value: 3,
        label: '通知公告',
    }
])
// 图片
const uploadChange = (file) => {
    formModel.value.cover = URL.createObjectURL(file)
    formModel.value.file = file
    // console.log(formModel.value.file);
}
// 提交
const submitForm = () => {
    formRef.value.validate(async(valid) => {
        if (valid) {
            await upload('http://localhost:3000/adminapi/news/addNews', formModel.value)
            ElMessage.success('添加新闻成功！')
            router.push('/news-manage/newsList')
        }
    })
}
</script>

<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">新闻管理发布系统</el-breadcrumb-item>
            <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加新闻</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-form :model="formModel" ref="formRef" :rules="rules" label-width="100px" style="margin-right:110px;">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="formModel.title" type="text"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <Editor @event="handleChange"></Editor>
                </el-form-item>
                <el-form-item label="分类" prop="category">
                    <el-select v-model="formModel.category" class="m-2" style="width: 100%;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <Upload :avatar="formModel.cover" @uploadChange="uploadChange"></Upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">
                        添加新闻
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.el-card {
    margin-top: 15px;

}
</style>