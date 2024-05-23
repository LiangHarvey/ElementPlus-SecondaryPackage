<script lang="ts" setup>
import { ref, watch } from "vue"
import * as EleIcons from '@element-plus/icons-vue'
import { toLine } from "../../../utils";
import { useCopy } from '../../../hooks/index.ts'

const props = defineProps<{
    // 弹出框标题
    title: string,
    // 弹出框是否显示
    visible: boolean
}>()

const emits = defineEmits(['update:visible'])

const dialogVisible = ref(props.visible)

// 点击选择图标按钮
const handleClick = () => {
    dialogVisible.value = !dialogVisible.value
}

// 点击复制图标名字
const clickItem = (item: string) => {
    let text = `<el-icon-${toLine(item)} />`
    useCopy(text)
    dialogVisible.value = false
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
    <div class="m-choose-icon-dialog-body-height">
        <el-dialog :title="title" v-model="dialogVisible" width="30%">
            <div class="container">
                <div class="item" v-for="(item, index) in Object.keys(EleIcons)" :key="index" @click="clickItem(item)">
                    <div>
                        <component :is="`el-icon-${toLine(item)}`"></component>
                    </div>
                    <div class="icon">{{ item }}</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-wrap: wrap;

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 25%;
        margin-bottom: 20px;
        height: 70px;
        cursor: pointer;

        svg {
            width: 2em;
            height: 2em;
        }

        .icon {
            font-size: 14px;
        }
    }
}
</style>
