<script lang="ts" setup>
import { PropType, ref, onMounted, shallowRef, nextTick, watch } from "vue"
import cloneDeep from 'lodash/cloneDeep'
import { FormInstance, FormOptions } from './types/types.ts'
// 设置表单区域高度
import './style/index.scss'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { IEditorConfig } from '@wangeditor/editor'



const props = defineProps({
    // 表单配置项
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    },
    httpRequest: {
        type: Function
    }
})

// 重写重置方法-重置表单
function resetFields(): any {
    refForm.value!.resetFields()
    // 清空已上传的文件列表
    uploadRef.value![0].clearFiles()
    // 重置富文本
    if (props.options && props.options.length) {
        let editorItem = props.options.find(item => item.type === 'editor')
        valueHtml.value = editorItem?.value
    }
}

// 表单验证方法
function validate() {
    return refForm.value?.validate
}

// 获取表单数据
// 不直接暴露model.value的原因：defineExpose只会把初始的model数据向外暴露
function getFormData() {
    return model.value
}

// 向外暴露方法-暴露elementplus的form实例的方法
defineExpose({
    resetFields,
    validate,
    getFormData
})

// el-form实例
const refForm = ref<FormInstance | null>(null)
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
            if (item.type === 'editor') {
                nextTick(() => {
                    // todo，未解决
                    // editorConfig.value.placeholder = item.placeholder!
                    // 初始化富文本内容
                    valueHtml.value = item.value
                })
            }
        })
        model.value = cloneDeep(m)
        rules.value = cloneDeep(r)
    }
}
onMounted(() => {
    initForm()
})


// 上传组件
const uploadRef = ref(null)
const emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'on-exceed', 'before-upload', 'before-remove'])

const onPreview = (file: File) => {
    emits('on-preview', { file })
}

const onRemove = (file: File, fileList: FileList) => {
    emits('on-remove', { file, fileList })
}

const onSuccess = (response: any, file: File, fileList: FileList) => {
    let uploadItem = props.options.find(item => item.type === 'upload')
    // 给表单整体绑定数据附上上传文件的值
    model.value[uploadItem!.prop!] = { response, file, fileList }
    emits('on-success', { response, file, fileList })
}

const onError = (err: any, file: File, fileList: FileList) => {
    emits('on-error', { err, file, fileList })
}

const onProgress = (event: any, file: File, fileList: FileList) => {
    emits('on-progress', { event, file, fileList })
}

const onChange = (file: File, fileList: FileList) => {
    emits('on-change', { file, fileList })
}

const onExceed = (files: File, uploadFiles: FileList) => {
    emits('on-exceed', { files, uploadFiles })
}

const beforeUpload = (rawFile: File) => {
    emits('before-upload', { rawFile })
}

const beforeRemove = (uploadFile: File, uploadFiles: FileList) => {
    emits('before-remove', { uploadFile, uploadFiles })
}


// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
const toolbarConfig = {}
const editorConfig = ref({
    // placeholder: '描述不能为空'
    placeholder: props.options.find(item => item.type === 'editor')?.placeholder
})
const mode = 'default'
const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

// 监听富文本内容修改，同步到model中
// 解决富文本检验失败方法1
// 校验就失效原因,因为不输入时，富文本的值是<p><br></p>，所以要手动赋空值，空值才能被校验失败
// 进入页面就被赋值了-"<p><br></p>"
watch(() => valueHtml.value, val => {
    if (val === '<p><br></p>') {
        model.value[(props.options.find(item => item.type === 'editor')).prop!] = ''
        return
    }
    model.value[(props.options.find(item => item.type === 'editor')).prop!] = val
})

</script>

<template>
    <el-form ref="refForm" v-if="model" :model="model" :rules="rules" :validate-on-rule-change="false" v-bind="$attrs">
        <template v-for="(item, index) in options" :key="index">
            <!-- 无childre -->
            <el-form-item v-if="!item.children || !item.children.length" :prop="item.prop" :label="item.label">
                <component v-if="item.type !== 'upload' || item.type !== 'editor'" v-model="model[item.prop!]"
                    v-bind="item.attrs" :placeholder="item.placeholder" :is='`el-${item.type}`'>
                </component>
                <!-- 上传组件 -->
                <el-upload ref="uploadRef" v-if="item.type === 'upload'" v-bind="item.uploadAttrs" class="m-upload"
                    :on-preview="onPreview" :on-remove="onRemove" :on-success="onSuccess" :on-error="onError"
                    :on-progress="onProgress" :on-change="onChange" :on-exceed="onExceed" :before-upload="beforeUpload"
                    :before-remove="beforeRemove" :http-request="httpRequest">
                    <slot name="uploadArea"></slot>
                    <slot name="uploadTip"></slot>
                </el-upload>
                <!-- 富文本编辑器 -->
                <div v-if="item.type === 'editor'" id="editor">
                    <Toolbar style="border: 1px solid #ccc;border-bottom: 0" :editor="editorRef"
                        :defaultConfig="toolbarConfig" :mode="mode" />
                    <Editor style="height: 500px; overflow-y: hidden;border: 1px solid #ccc" v-model="valueHtml"
                        :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
                </div>
            </el-form-item>
            <!-- 有childre-还有子组件-多选框下拉框 -->
            <el-form-item v-if="item.children && item.children.length" :prop="item.prop" :label="item.label">
                <component v-model="model[item.prop!]" v-bind="item.attrs" :placeholder="item.placeholder"
                    :is='`el-${item.type}`'>
                    <component v-for="(child, i) in item.children" :value="child.value" :label="child.label" :key="i"
                        :is='`el-${child.type}`'>
                    </component>
                </component>
            </el-form-item>
        </template>
        <!-- 操作插槽 -->
        <el-form-item>
            <slot name="action" :form="refForm" :model="model"></slot>
        </el-form-item>
    </el-form>

</template>

<style lang="scss" scoped></style>
