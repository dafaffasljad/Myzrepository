<script setup>
import { Plus } from '@element-plus/icons-vue'
// 头像
defineProps({
    avatar: String
})
const emit=defineEmits(['uploadChange'])
const handleChange = (file) => {
    // console.log(file);
    // formModel.value.avatar = URL.createObjectURL(file.raw)
    // formModel.value.file = file.raw
    emit('uploadChange',file.raw)
}
</script>

<template>
    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" :auto-upload="false" :on-change="handleChange">
        <img v-if="avatar" :src="avatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<style lang="scss" scoped>
.avatar {
    width: 178px;
    height: 178px;
}
:deep(.el-upload) {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    :deep(.el-upload:hover) {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>