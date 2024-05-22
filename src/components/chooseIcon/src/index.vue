<script lang="ts" setup>
import { ref, watch } from "vue"

const props = defineProps<{
    // 弹出框标题
    title: string,
    // 弹出框是否显示
    visible: boolean
}>()

const emits = defineEmits(['update:visible'])

const dialogVisible = ref(props.visible)

const handleClick = () => {
    dialogVisible.value = !dialogVisible.value
}

watch(() => dialogVisible.value, val => {
    console.log(val)
    emits('update:visible', val)
})
</script>

<template>
    <el-button type="primary" size="default" @click="handleClick">
        <slot></slot>
    </el-button>
    <!-- 弹出框 -->
    <el-dialog :title="title" v-model="dialogVisible" width="30%">

    </el-dialog>

</template>

<style lang="scss" scoped></style>
