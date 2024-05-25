<script lang="ts" setup>
import { ref } from "vue"
import NavAside from './navAside/index.vue'
import NavHeader from './navHeader/index.vue'

const isCollapse = ref(false)

</script>

<template>
    <el-container>
        <el-aside width="auto">
            <nav-aside :collapse="isCollapse"></nav-aside>
        </el-aside>
        <el-container>
            <el-header>
                <nav-header v-model:collapse="isCollapse"></nav-header>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss">
.el-header{
    padding: 0;
    border-bottom: 1px solid #eee;
}
</style>
