<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { getNewsList, upNewsPublish, deNewsList, getNewsCount } from '@/util/news';
import { onMounted, ref } from 'vue';
import formatTime from '@/util/formatTime';
import { Edit, Delete, View } from '@element-plus/icons-vue';
import router from '@/router'

const count = ref()
const params = ref({
    pageSize: 8,
    pageNum: 1
})
const dialogVisible = ref(false)
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
    count.value = res.data.data-1

}
onMounted(() => {
    getList()
    getCount()
})


// 类别
const categoryFormat = (data) => {
    const arr = ['最新动态', '典型动态', '通知公告']
    return arr[Number(data) - 1]
}
// 发布变化
const handleSwitchChange = async (row) => {
    await upNewsPublish({ _id: row._id, isPublish: row.isPublish })
    getList()
}
// 查看新闻
const preview = ref({})
const handleSelect = (row) => {
    dialogVisible.value = true
    // console.log(row);
    preview.value = row
}
// 删除新闻
const handleDelete = async (row) => {
    await ElMessageBox.confirm('你确定要删除吗？', '温馨提示', {
        type: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        lockScroll: false
    })
    await deNewsList(row._id)
    ElMessage.success('删除新闻成功！')
    getList()
}
// 编辑新闻
const handleEdit = (row) => {
    router.push(`/news-manage/newsEdit/${row._id}`)
}

// const handleSizeChange=(size) => {
//     console.log(size);
// }

// 当前页码
const handleCurrentChange = (size) => {
    params.value.pageNum = size
    getList()
}

</script>

<template>
    <!-- 面包屑导航 -->
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">新闻管理发布系统</el-breadcrumb-item>
        <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
        <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="标题" width="250" />
            <el-table-column label="分类" width="250">
                <template #default="{ row }">
                    {{ categoryFormat(row.category) }}
                </template>
            </el-table-column>
            <el-table-column prop="editTime" label="更新时间">
                <template #default="{ row }">
                    {{ formatTime.getTime(row.editTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="isPublish" label="发布状态" width="250">
                <template #default="{ row }">
                    <el-switch v-model="row.isPublish" :active-value="1" :inactive-value="0"
                        @change="handleSwitchChange(row)">

                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template #default="{ row }">
                    <el-button circle plain :icon="View" type="success" @click="handleSelect(row)"></el-button>
                    <el-button circle plain :icon="Edit" type="primary" @click="handleEdit(row)"> </el-button>
                    <el-button circle plain :icon="Delete" type="danger" @click="handleDelete(row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" title="预览新闻" width="50%" :lock-scroll="false">
            <div>
                <h1>{{ preview.title }}</h1>
                <div>{{ formatTime.getTime(preview.editTime) }}</div>
                <el-divider>
                    <el-icon>
                        <View />
                    </el-icon>
                </el-divider>
                <div v-html="preview.content" class="content"></div>
            </div>

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
</style>