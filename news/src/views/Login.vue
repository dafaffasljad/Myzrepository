<script setup>
import { ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
import router from '@/router';
import axios from 'axios';
import { useUserStore } from '@/stores/index.js'
import { toRegister } from '@/util/user'

const isLogin = ref(true)
// 特效
const options = {
    background: {
        color: {
            value: '#87ceeb'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'bounce'
            },
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 },
        }
    },
    detectRetina: true
}
// 规则
const form = ref()
const formModel = ref({
    username: '',
    password: '',
    repassword: '',
    role: 3
})
const rules = {
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    repassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== formModel.value.password) {
                    callback('两次输入不一致')
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ]
}
// 登录
const userStore = useUserStore()
const login = () => {
    form.value.validate(async (valid) => {
        if (valid) {
            const res = await axios.post('http://localhost:3000/adminapi/user/login', formModel.value)

            if (res.data.ActionType === 'OK') {
                // 本地存储
                userStore.userInfo = res.data.data
                ElMessage.success('登陆成功！')
                router.push('/')
            } else {
                ElMessage.error('用户名或密码错误！')
            }

        }
    })

}
const register = async () => {
    form.value.validate(async (valid) => {
        if (valid) {
            await toRegister(formModel.value)
            ElMessage.success('注册成功！')
            isLogin.value = true
            formModel.value = {}
        }
    })

}
</script>

<template>
    <particles id="tsparticles" :options="options" />
    <div class="containner">
        <!-- 登录 -->
        <el-form v-if="isLogin" @keyup.enter="login" ref="form" size="large" autocomplete="off" :rules="rules"
            :model="formModel" label-width="100px" style="margin-right: 30px;">
            <el-form-item>
                <h1>新闻发布系统</h1>
            </el-form-item>
            <el-form-item prop="username" label="账号">
                <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="formModel.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="formModel.password"></el-input>
            </el-form-item>
            <el-form-item class="flex">
                <div class="flex">
                    <el-checkbox>记住我</el-checkbox>
                    <el-link type="primary" :underline="false">忘记密码？</el-link>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
            </el-form-item>
            <el-form-item class="flex">
                <el-link type="info" :underline="false" @click="isLogin = false">
                    注册 →
                </el-link>
            </el-form-item>
        </el-form>
        <!-- 注册 -->
        <el-form v-else @keyup.enter="register" ref="form" size="large" autocomplete="off" :rules="rules" :model="formModel"
            label-width="100px" style="margin-right: 30px;">
            <el-form-item>
                <h1>新闻发布系统</h1>
            </el-form-item>
            <el-form-item prop="username" label="账号">
                <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="formModel.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="formModel.password"></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请确认密码"
                    v-model="formModel.repassword"></el-input>
            </el-form-item>
            <!-- <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item> -->
            <el-form-item>
                <el-button class="button" type="primary" auto-insert-space @click="register">注册</el-button>
            </el-form-item>
            <el-form-item class="flex">
                <el-link type="info" :underline="false" @click="isLogin = true">
                    登录 →
                </el-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.containner {
    width: 600px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    border-radius: 10%;
    background: rgba($color: #000000, $alpha: 0.3);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    padding-right: 30px;
    box-shadow: 10px 10px 5px #888888;





    .button {
        width: 100%;
    }

    .flex {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    :deep(.el-form-item__label) {
        color: white;
        font-size: 15px;
    }

    :deep(.el-checkbox__label) {
        color: white;
    }

    :deep(.el-link__inner) {
        color: white
    }

    :deep(.el-link__inner:hover) {
        color: blue
    }

    h1 {
        margin: 0 auto;
        font-size: 30px;
        margin-bottom: 30px;
        letter-spacing: 0.2em;
    }

}
</style>