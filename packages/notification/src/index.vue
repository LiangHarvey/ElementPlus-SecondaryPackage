<script lang="ts" setup>
import { } from "vue"
import { toLine } from "../../utils"


const props = defineProps({
    // 显示图标
    icon: {
        type: String,
        default: 'Bell'
    },
    // 角标显示值
    value: {
        type: [String, Number],
        default: ''
    },
    // 最大值
    max: {
        type: Number
    },
    isDot: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div class="">
        <el-popover placement="bottom" :width="300" trigger="click">
            <template #default>
                <slot></slot>
            </template>
            <template #reference>
                <el-badge :value="value" :max="max" :is-dot="isDot" style="cursor: pointer;">
                    <component :is='`el-icon-${toLine(icon)}`'></component>
                </el-badge>
            </template>
        </el-popover>


    </div>
</template>

<style lang="scss" scoped></style>
