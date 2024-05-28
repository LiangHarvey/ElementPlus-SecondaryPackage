<script lang="ts" setup>
import { PropType, ref, onMounted } from "vue"
import cloneDeep from 'lodash/cloneDeep'
import { FormOptions } from './types/types.ts'
import './style/index.scss'

const props = defineProps({
    // 表单配置项
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    }
})

// 整体表单数据对象
const model = ref({})
// 整体表单验证规则
const rules = ref({})

// 初始化整体表单的值和验证规则
const initForm = () => {
    if (props.options && props.options.length) {
        let m: any = {}
        let r: any = {}
        // 从父组件获得每个表单的检验规则
        props.options.forEach(item => {
            // 遍历添加新属性
            m[item.prop!] = item.value
            r[item.prop!] = item.rules
        })
        model.value = cloneDeep(m)
        rules.value = cloneDeep(r)
    }
}
onMounted(() => {
    initForm()
})

// 上传组件
const emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'before-upload', 'before-remove', 'http-request'])

const onPreview = (file: any) => {
    emits('on-preview', { file })
}

const onRemove = (file: any, fileList: any) => {
    emits('on-remove', { file, fileList })
}

const onSuccess = (response: any, file: any, fileList: any) => {
    emits('on-success', { response, file, fileList })
}

const onError = (err: any, file: any, fileList: any) => {
    emits('on-error', { err, file, fileList })
}

const onProgress = (event: any, file: any, fileList: any) => {
    emits('on-progress', { event, file, fileList })
}

const onChange = (file: any, fileList: any) => {
    emits('on-change', { file, fileList })
}

const beforeUpload = (rawFile: any) => {
    emits('before-upload', { rawFile })
}

const beforeRemove = (uploadFile: any, uploadFiles: any) => {
    emits('before-remove', { uploadFile, uploadFiles })
}

const httpRequest = (options: any) => {
    emits('http-request', { options })
}
</script>

<template>
    <el-form v-if="model" :model="model" :rules="rules" :validate-on-rule-change="false" v-bind="$attrs">
        <template v-for="(item, index) in options" :key="index">
            <!-- 无childre -->
            <el-form-item v-if="!item.children || !item.children.length" :prop="item.prop" :label="item.label">
                <component v-if="item.type !== 'upload'" v-model="model[item.prop!]" v-bind="item.attrs"
                    :placeholder="item.placeholder" :is='`el-${item.type}`'>
                </component>
                <!-- 上传组件 -->
                <el-upload v-else v-bind="item.uploadAttrs" class="m-upload" :on-preview="onPreview"
                    :on-remove="onRemove" :on-success="onSuccess" :on-error="onError" :on-progress="onProgress"
                    :on-change="onChange" :before-upload="beforeUpload" :before-remove="beforeRemove"
                    :http-request="httpRequest">
                    <slot name="uploadArea"></slot>
                    <slot name="uploadTip"></slot>
                </el-upload>
            </el-form-item>
            <!-- 有childre -->
            <el-form-item v-if="item.children && item.children.length" :prop="item.prop" :label="item.label">
                <component v-model="model[item.prop!]" v-bind="item.attrs" :placeholder="item.placeholder"
                    :is='`el-${item.type}`'>
                    <component v-for="(child, i) in item.children" :value="child.value" :label="child.label" :key="i"
                        :is='`el-${child.type}`'>
                    </component>
                </component>
            </el-form-item>
        </template>
    </el-form>

</template>

<style lang="scss" scoped></style>
