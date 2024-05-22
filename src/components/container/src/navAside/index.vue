<script lang="ts" setup>
import { } from "vue"

const props = defineProps<{
    collapse: boolean
}>()
</script>

<template>
    <el-menu :collapse="collapse" class="el-menu-vertical-demo">
        <el-menu-item index="1">
            <el-icon-menu></el-icon-menu>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon-menu></el-icon-menu>
            <span>图标选择器</span>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon-menu></el-icon-menu>
            <span>3</span>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon-menu></el-icon-menu>
            <span>4</span>
        </el-menu-item>
    </el-menu>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>
