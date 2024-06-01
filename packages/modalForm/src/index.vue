<script lang="ts" setup>
import { PropType, ref, watch } from "vue"
import { FormInstance, FormOptions } from "../../form/src/types/types";

const emits = defineEmits(['update:visible'])

// 把上传组件触发的函数通过props传入，与elementPlus的保持一致
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    // 
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    },
    onChange: {
        type: Function
    },
    beforeUpload: {
        type: Function
    },
    onPreview: {
        type: Function
    },
    onRemove: {
        type: Function
    },
    beforeRemove: {
        type: Function
    },
    onSuccess: {
        type: Function
    },
    onExceed: {
        type: Function
    },
    // 是否给dialog添加样式，样式在/src/style/ui.scss中
    isScroll: {
        type: Boolean,
        default: false
    }
})

const dialogVisible = ref(props.visible)

// 接收父组件-设为true
watch(() => props.visible, val => {
    dialogVisible.value = val
})

// 点击关闭-设为false
watch(() => dialogVisible.value, val => {
    emits('update:visible', val)
})

// 表单实例
const formRef = ref<FormInstance | null>()

</script>

<template>
    <el-dialog :class="{ 'm-choose-icon-dialog-body-height': isScroll }" v-model="dialogVisible" v-bind="$attrs">
        <template #default>
            <m-form label-width="100px" ref="formRef" :options="options" @on-change="onChange"
                @before-upload="beforeUpload" @on-preview="onPreview" @on-remove="onRemove"
                @before-remove="beforeRemove" @on-success="onSuccess" @on-exceed="onExceed">
                <!-- 上传组件插槽 -->
                <template #uploadArea>
                    <slot name="uploadArea"></slot>

                </template>
                <template #uploadTip>
                    <slot name="uploadTip"></slot>
                </template>
            </m-form>
        </template>
        <template #footer>
            <slot name="footer" :form="formRef"></slot>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped></style>
