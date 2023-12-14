<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { getNewsList, getNewsCount, clearLikeAPI } from '@/util/news';
import { onMounted, ref } from 'vue';
import formatTime from '@/util/formatTime';
import { View } from '@element-plus/icons-vue';


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
    count.value = res.data.data

}
onMounted(() => {
    getList()
    getCount()
})


// 清空点赞熟练
const handleClear = async (id) => {
    await ElMessageBox.confirm("你确定要清空点赞数量吗？", "警告", {
        type: "warning",
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        lockScroll: false

    })
    await clearLikeAPI(id)
    getList()
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
        <el-breadcrumb-item>点赞管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="标题" width="700" />
            <!-- <el-table-column label="分类" width="250">
                <template #default="{ row }">
                    {{ categoryFormat(row.category) }}
                </template>
            </el-table-column> -->
            <el-table-column prop="LikeNum" label="点赞数量" width="300"></el-table-column>

            <el-table-column label="操作" width="180">
                <template #default="{ row }">
                    <el-button type="primary" @click="handleClear(row._id)">clear</el-button>
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