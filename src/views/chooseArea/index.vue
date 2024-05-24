<script lang="ts" setup>
import { } from "vue"
// 已全局注册mChooseArea组件
import mChooseArea from '../../components/chooseArea/src/index.vue'

const changeArea = (e:any) => {
    console.log(e)
}
</script>

<template>
    <m-choose-area @change="changeArea"></m-choose-area>
</template>

<style lang="scss" scoped></style>
