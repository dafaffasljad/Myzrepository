<script setup>
import { Search } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import router from '@/router'

moment.locale('zh-cn')
const activeName = ref(1)
const newList = ref([])
const searchText = ref('')
const visible = ref(false)

// 渲染数据
onMounted(async () => {
  const res = await axios.get('http://localhost:3000/webapi/news/getNewsList')
  newList.value = res.data.data
  // console.log(res.data.data)
  // console.log(_.groupBy(newList.value, item => item.category));

})
// 筛选出搜索内容
const searchList = computed(() =>
  searchText.value ? newList.value.filter((item) => item.title.includes(searchText.value)) : []
)
// 头部图片
const topNewsList = computed(() => newList.value.slice(0, 4))
// 时间格式化
const formatTime = (time) => {
  return moment(time).format('YYYY/MM/DD HH:mm:ss')
}

const tabList = [
  {
    label: '最新动态',
    name: 1
  },
  {
    label: '典型案例',
    name: 2
  },
  {
    label: '通知公告',
    name: 3
  },
]
// 根据category进行分类
const tabNews = computed(() => _.groupBy(newList.value, item => item.category))
// 访问新闻详情
const handleChangePage = (_id) => {
  console.log(_id);
  router.push(`/new/${_id}`)
}
</script>

<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="header"></div>
    <!-- 搜索框 -->
    <div class="search">
      <el-popover placement="bottom" title="检索" width="50%" content="this is content, this is content, this is content"
        :visible="visible">
        <template #reference>
          <el-input v-model="searchText" class="w-50 m-2" placeholder="请输入搜索内容" :prefix-icon="Search" size="large"
            type="search" @input="visible = true" @blur="visible = false" />
        </template>
        <div v-if="searchList.length">
          <div v-for="item in searchList" :key="item._id" class="search-item" @click="handleChangePage(item._id)">
            {{ item.title }}
          </div>
        </div>
        <div v-else>暂无数据...</div>
      </el-popover>
    </div>
    <!-- 顶部最新动态 -->
    <div class="topNews">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id" @click="handleChangePage(item._id)">
          <el-card :body-style="{ padding: '20px' }" shadow="hover">
            <img :src="item.cover" class="image" />
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ formatTime(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- tab栏 -->
    <div class="tabs" style="margin: 20px;">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
          <div v-for="data in tabNews[item.name]" :key="data._id" style="padding: 10px;"
            @click="handleChangePage(data._id)">
            <el-card :body-style="{ padding: '4px' }" shadow="hover">
              <img :src="data.cover" class="tabs-image" />
              <div style="padding: 20px;float: left;">
                <span>{{ data.title }}</span>
                <div class="bottom">
                  <time class="time">{{ formatTime(data.editTime) }}</time>
                </div>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-backtop :right="100" :bottom="100" />

  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 60px;
  position: relative;
  height: 1200px;

  .el-backtop {
    width: 60px;
    height: 60px;
    background: linear-gradient(90deg,
        cyan,
        purple);
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
      }
    }
  }

  .header {
    background-image: url('@/assets/newsbg.jpg');
    background-size: cover;
    height: 450px;
    // background-color: pink;
  }

  .search {
    position: absolute;
    top: 350px;
    width: 100%;
    text-align: center;

    .el-input {
      width: 50%;
    }
  }
}

:deep(.search-item) {
  height: 30px;
  line-height: 30px;
  cursor: pointer;

  &:hover {
    color: skyblue;
    background-color: whitesmoke;
  }
}

.topNews {
  margin: 20px;

  .image {
    width: 100%;
    height: 200px;
    background-size: cover;
  }

  .el-card {
    height: 350px;

    .time {
      font-size: 12px;
      color: gray;
    }
  }

}

.tabs-image {
  width: 200px;
  height: 150px;
  background-size: cover;
  float: left;
  padding: 20px;
}
</style>
