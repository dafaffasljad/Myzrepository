<script setup>
import { onBeforeUnmount, ref, watchEffect } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router'
import moment from 'moment';
import { StarFilled } from '@element-plus/icons-vue'
import router from '@/router'
import { useUserStore } from '@/stores'
import defaultImg from '@/assets/default.png'
import { addCommentAPI } from "@/apis/user.js"

const commentList = ref([])
const commentCount = ref(0)
const userStore = useUserStore()
const dialogFormVisible = ref(false)
const like = ref(true)
const route = useRoute()
const newData = ref({})
const cardList = ref([])
const LikeNum = ref(0)
// 渲染数据
const getList = async () => {
    const res = await axios.get(`http://localhost:3000/webapi/news/getNewsInfo/${route.params.id}`)
    const res2 = await axios.get(`http://localhost:3000/webapi/news/getCardList?limit=4`)
    newData.value = res.data.data
    commentList.value = res.data.data.CommentList
    // console.log(res2);
    cardList.value = res2.data.data
    // console.log(res.data.data)
    // console.log(_.groupBy(newList.value, item => item.category));
    commentList.value.forEach((item, index) => {
        commentCount.value = index + 1
    })
}
watchEffect(() => {
    if (!route.params.id) {
        return
    }
    getList()
})

onBeforeUnmount(() => {
    stop()
})
const formatTime = (time) => {
    return moment(time).format('YYYY/MM/DD HH:mm:ss')
}

const handleChange = (_id) => {
    router.push(`/new/${_id}`)
}
// 点赞
const addLike = async () => {
    LikeNum.value += 1
    like.value = false
    console.log({
        NewsID: route.params.id,
        UserID: userStore.userInfo._id,
        like: like.value
    });
    await axios.post('http://localhost:3000/webapi/news/addlike', {
        NewsID: route.params.id,
        UserID: userStore.userInfo._id,
        like: like.value
    })
}
// 取消点赞
const removeLike = async () => {
    LikeNum.value -= 1
    like.value = true
    await axios.post('http://localhost:3000/webapi/news/addlike', {
        NewsID: route.params.id,
        UserID: userStore.userInfo._id,
        like: like.value
    })
    LikeNum.value -= 1
}
const likeList = ref([])
// 获取点赞数量
const getLike = async () => {
    const res = await axios.get(`http://localhost:3000/webapi/news/getLike/${route.params.id}`)
    likeList.value = res.data.data[0].UserIDList
    likeList.value.find(item => {
        if (item === userStore.userInfo._id) {
            like.value = false
        }
    })

    LikeNum.value = res.data.data[0].LikeNum
}
getLike()
// 评论参数
const formModel = ref({
    id: route.params.id,
    comment: '',
    username: userStore.userInfo.username,
    avatar: userStore.userInfo.avatar
})
// 添加评论
const addComment = () => {
    dialogFormVisible.value = true
}
// 添加评论确认
const addConfirm = async () => {
    dialogFormVisible.value = false
    await addCommentAPI(formModel.value)
    ElMessage.success("发布成功")
    getList()
    formModel.value.comment = ""
}

</script>

<template>
    <NavBar></NavBar>
    <div style="margin-top: 60px;">
        <el-row>
            <el-col :span="3">
                <div class="iconBox">
                    <div style="text-align: center;">
                        <svg v-if="like" @click="addLike" t="1698225936389" class="icon1" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7696" width="200" height="200">
                            <path
                                d="M773.6 912.7h-1.2c-37.2-0.4-74.5-0.4-111.8-0.4h-56.9c-38 0-76 0-114.1-0.5-21.1-0.6-41.9-5-61.5-13-33.3-13-52.3-42-52.2-79.7l0.1-141.4c0-78.3 0-156.7 0.7-235 0.1-21.3 13.8-41.3 25.5-51.8 45.3-41.4 94.5-93 115.1-162.6 5.7-19.4 7.9-40.8 10.2-63.4 4.6-45 33.8-74.3 72.8-74.3 15.3 0 30.6 4.6 45.6 13.5 30.1 18.1 50.2 46.5 61.3 87 17.8 64.3 8.7 126.7-1.3 180.2v0.2c-2.3 12.5 7.1 24.1 19.9 24.1h130c22.4 0 54.5 2.8 74.3 26.8 14.4 17.5 18.5 41.1 12.4 72.3-18.6 95.9-41.4 192.6-63.2 282.7-6.8 28.1-18.1 54.1-29 79.3l-4.7 10.8c-12.4 29.2-38 45.2-72 45.2zM216.1 903.3h-11.9c-43 0-78.2-35.2-78.2-78.2V476.6c0-43 35.2-78.2 78.2-78.2h11.9c43 0 78.2 35.2 78.2 78.2V825c0.1 43.1-35.1 78.3-78.2 78.3z"
                                fill="#333333" p-id="7697"></path>
                        </svg>
                        <svg v-else @click="removeLike" t="1698225936389" class="icon2" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7696" width="200" height="200">
                            <path
                                d="M773.6 912.7h-1.2c-37.2-0.4-74.5-0.4-111.8-0.4h-56.9c-38 0-76 0-114.1-0.5-21.1-0.6-41.9-5-61.5-13-33.3-13-52.3-42-52.2-79.7l0.1-141.4c0-78.3 0-156.7 0.7-235 0.1-21.3 13.8-41.3 25.5-51.8 45.3-41.4 94.5-93 115.1-162.6 5.7-19.4 7.9-40.8 10.2-63.4 4.6-45 33.8-74.3 72.8-74.3 15.3 0 30.6 4.6 45.6 13.5 30.1 18.1 50.2 46.5 61.3 87 17.8 64.3 8.7 126.7-1.3 180.2v0.2c-2.3 12.5 7.1 24.1 19.9 24.1h130c22.4 0 54.5 2.8 74.3 26.8 14.4 17.5 18.5 41.1 12.4 72.3-18.6 95.9-41.4 192.6-63.2 282.7-6.8 28.1-18.1 54.1-29 79.3l-4.7 10.8c-12.4 29.2-38 45.2-72 45.2zM216.1 903.3h-11.9c-43 0-78.2-35.2-78.2-78.2V476.6c0-43 35.2-78.2 78.2-78.2h11.9c43 0 78.2 35.2 78.2 78.2V825c0.1 43.1-35.1 78.3-78.2 78.3z"
                                fill="#d81e06" p-id="7697"></path>
                        </svg>
                        <p style="font-size: 10px;color: e5e5e5;">{{ LikeNum || 0 }}</p>
                    </div>

                    <div style="text-align: center;">
                        <svg @click="addComment" t="1698226337501" class="icon3" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="8834" width="200" height="200">
                            <path
                                d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667a424.778667 424.778667 0 0 1-219.125333-60.501334 2786.56 2786.56 0 0 0-20.053334-11.765333l-104.405333 28.48c-23.893333 6.506667-45.802667-15.413333-39.285333-39.296l28.437333-104.288c-11.008-18.688-18.218667-31.221333-21.802667-37.909333A424.885333 424.885333 0 0 1 85.333333 512C85.333333 276.362667 276.362667 85.333333 512 85.333333z m-102.218667 549.76a32 32 0 1 0-40.917333 49.216A223.178667 223.178667 0 0 0 512 736c52.970667 0 103.189333-18.485333 143.104-51.669333a32 32 0 1 0-40.906667-49.216A159.189333 159.189333 0 0 1 512 672a159.189333 159.189333 0 0 1-102.218667-36.906667z"
                                fill="#000000" p-id="8835"></path>
                        </svg>
                        <p style="font-size: 10px;color: e5e5e5;">{{ commentCount }}</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="13">
                <div style="display: flex;justify-content: space-between;">
                    <div>
                        <h2>{{ newData.title }}</h2>
                        <div class="time">{{ formatTime(newData.editTime) }}</div>
                    </div>
                </div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div class="content" v-html="newData.content"></div>
                <div class="comment">
                    <div>
                        <h3>评论 {{ commentCount }}</h3>
                    </div>
                    <div class="commentList" v-for="item in commentList" :key="item">
                        <div><el-avatar :src="item.avatar || defaultImg"></el-avatar></div>
                        <div style="margin-left: 30px;">
                            <div>{{ item.username }}</div>
                            <div style="margin-top: 15px;">{{ item.comment }}</div>
                            <div style="margin-top: 15px;font-size: 12px;color: gray;">
                                {{ formatTime(item.comTime) }}
                            </div>
                        </div>
                    </div>

                </div>
            </el-col>

            <el-col :span="5" :offset="1" :pull="1">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span style="font-size: 16px;font-weight: bold;">最近新闻</span>
                        </div>
                    </template>
                    <div v-for="o in cardList" :key="o._id" class="text" style="padding: 15px;"
                        @click="handleChange(o._id)">
                        <div>{{ o.title }}
                        </div>
                        <time class="time">{{ formatTime(o.editTime) }}</time>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-backtop :right="60" :bottom="100" />

        <el-dialog v-model="dialogFormVisible" title="添加评论">
            <el-form :model="formModel">
                <el-form-item :label-width="1" prop="comment">
                    <el-input v-model="formModel.comment" type="textarea" placeholder="请文明发言噢~" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">再想想</el-button>
                    <el-button type="primary" @click="addConfirm">
                        发表评论
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.el-row {
    margin-top: 60px;

    .time {
        font-size: 12px;
        color: gray;
    }


    .el-card {
        margin-top: 194px;
        margin-left: 10px;

        .text {
            cursor: pointer;

            &:hover {
                color: rgb(77, 189, 234);
            }
        }
    }

    svg {
        cursor: pointer;
    }

    .iconBox {
        margin-top: 100px;
        position: fixed;
        margin-left: 100px;
    }

    .icon1 {
        width: 50px;
        height: 50px;
        margin-top: 58px;
        border-radius: 50%;
        padding: 10px;
        box-sizing: border-box;
        background-color: #f8f8f8;
    }

    .icon2 {
        width: 50px;
        height: 50px;
        margin-top: 58px;
        border-radius: 50%;
        padding: 10px;
        box-sizing: border-box;
        background-color: #fff2f2;
    }

    .icon3 {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        padding: 10px;
        box-sizing: border-box;
        background-color: #f8f8f8;
    }

    svg:hover {
        background-color: rgb(246, 241, 241);
    }
}

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

.comment {
    margin-top: 50px;

    .commentList {
        margin-top: 30px;
        display: flex;
    }
}
</style>