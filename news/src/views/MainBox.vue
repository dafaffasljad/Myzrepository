<script setup>

</script>

<template>
    <el-container class="container">
        <side-menu></side-menu>
        <el-container direction="vertical">
            <top-header></top-header>
            <el-main>
                <RouterView></RouterView>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.container {

    // height: 100vh;
    .el-main {
        overflow: auto;
        height: calc(100vh - 60px);
    }

}
</style>