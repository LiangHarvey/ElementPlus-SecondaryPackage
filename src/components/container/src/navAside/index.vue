<script lang="ts" setup>
import { } from "vue"

const props = defineProps<{
    collapse: boolean
}>()

const data = [
    {
        icon: "HomeFilled",
        name: "首页",
        index: "/",
    },
    {
        icon: "ElementPlus",
        name: "按钮",
        index: "/button",
    },
    {
        icon: "ElementPlus",
        name: "折叠面板",
        index: "/collapse",
    },
    {
        icon: "ElementPlus",
        name: "原生图标",
        index: "/nativeicon",
    },
    {
        icon: "ElementPlus",
        name: "图标选择器",
        index: "/chooseIcon",
    },
    {
        icon: "Location",
        name: "区域选择",
        index: "/chooseArea",
    },
    {
        icon: "Position",
        name: "城市选择",
        index: "/chooseCity",
    },
    {
        icon: "Sort",
        name: "趋势",
        index: "/trend",
    },
    {
        icon: "Bell",
        name: "通知菜单",
        index: "/notification",
    },
    {
        icon: "Menu",
        name: "导航栏",
        index: "/menu",
    },
    {
        icon: "Calendar",
        name: "日历",
        index: "/calendar",
    },
    {
        icon: "Setting",
        name: "表单",
        index: "/form",
    },
    {
        icon: "Timer",
        name: "时间选择",
        index: "/chooseTime",
    },
    {
        icon: "Histogram",
        name: "进度条",
        index: "/progress",
    },
    {
        icon: "Setting",
        name: "弹出框表单",
        index: "/modalform",
    },
    {
        icon: "List",
        name: "表格",
        index: "/table",
    },
]
</script>

<template>
    <!-- <el-menu :collapse="collapse" class="el-menu-vertical-demo">
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
    </el-menu> -->
    <!-- 使用二次封装的menu组件  m-menu -->
    <m-menu :data="data" defaultActive="$router.path" router :collapse="collapse"
        class="el-menu-vertical-demo"></m-menu>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>
