<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { getNewsList, getNewsCount, deleteCommentAPI } from '@/util/news';
import { onMounted, ref } from 'vue';
// import formatTime from '@/util/formatTime';
// import { View } from '@element-plus/icons-vue';

const commentList = ref([])
const count = ref()
const params = ref({
    pageSize: 8,
    pageNum: 1
})
const dialogTableVisible = ref(false)
const loading = ref(false)
// 获取新闻列表
const tableData = ref([])
const getList = async () => {
    loading.value = true
    const res = await getNewsList(params.value)
    // console.log(res.data.data);
    tableData.value = res.data.data
    loading.value = false
}
// 获取新闻数量
const getCount = async () => {
    const res = await getNewsCount()
    count.value = res.data.data

}
onMounted(() => {
    getList()
    getCount()
})

const formModel = ref({
    id: '',
    username: '',
    comment: '',
})
// 评论管理
const handleEdit = async (row) => {
    formModel.value.id = row._id
    // console.log(row);
    dialogTableVisible.value = true
    commentList.value = row.CommentList
}

// 当前页码
const handleCurrentChange = (size) => {
    params.value.pageNum = size
    getList()
}

const handleDelete = async (item) => {
    formModel.value.comment = item.comment
    formModel.value.username = item.username
    await deleteCommentAPI(formModel.value)
    commentList.value = commentList.value.filter(i => item.comment !== i.comment)
    getList()
    ElMessage.success("删除成功！")
}

</script>

<template>
    <!-- 面包屑导航 -->
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">新闻管理发布系统</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="标题" width="700" />
            <!-- <el-table-column label="分类" width="250">
                <template #default="{ row }">
                    {{ categoryFormat(row.category) }}
                </template>
            </el-table-column> -->
            <el-table-column prop="" label="评论数量" width="300">
                <template #default="{ row }">
                    {{ row.CommentList.length }}
                </template>
            </el-table-column>

            <el-table-column label="操作" width="180">
                <template #default="{ row }">
                    <el-button type="primary" @click="handleEdit(row)">管理</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogTableVisible" title="评论管理">
            <ul v-if="commentList.length != 0" class="infinite-list" style="overflow: auto">
                <li v-for="item in commentList" :key="item" class="infinite-list-item">
                    <div style="display: flex;padding: 15px;width: 100%;position: relative;line-height: 70px;">
                        <div>{{ item.username }}</div>
                        <div style="margin-left: 110px;">{{ item.comment }}</div>
                        <div style="position: absolute;right: 0;"><el-button type="danger"
                                @click="handleDelete(item)">删除</el-button></div>
                    </div>
                </li>
            </ul>

            <ul v-else class="infinite-list" style="overflow: auto">
                <li class="infinite-list-item">
                    还没有评论哦~
                </li>
            </ul>

        </el-dialog>
    </el-card>
    <div class="demo-pagination-block">
        <el-pagination v-model:current-page="params.pageNum" v-model:page-size="params.pageSize" :background="true"
            :page-sizes="[100, 200, 300, 400]" layout=" total,  jumper,prev, pager, next" :total="Number(count)"
            @current-change="handleCurrentChange" />
    </div>
</template>

<style lang="scss" scoped>
.el-card {
    margin-top: 15px;
    height: 75vh;

    :deep(.content) {
        img {
            max-width: 100%;
        }
    }

    #myEditor {
        max-width: 200px;
    }


}

.demo-pagination-block {
    display: flex;
    margin-top: 15px;
    justify-content: flex-end;
}

.infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    // background: gray;
    border-bottom: 1px solid black;
    margin: 10px;
    color: gray;
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>