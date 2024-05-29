<script lang="ts" setup>
import { ref } from "vue"
import { FormInstance, FormOptions } from "../../components/form/src/types/types";
import { ElMessage } from 'element-plus'

const visible = ref(false)
const changeVisible = () => {
    visible.value = true
}

let options: FormOptions[] = [
    {
        type: 'input',
        // 表单项的值-初始值
        value: '',
        label: '用户名',
        prop: 'username',
        placeholder: '用户名长度2-6',
        rules: [
            {
                required: true,
                message: '用户名不能为空',
                trigger: 'blur'
            },
            {
                min: 2,
                max: 6,
                message: '用户名长度2-6',
                trigger: 'blur'
            }
        ],
        attrs: {
            clearable: true
        }
    },
    {
        type: 'input',
        value: '',
        label: '密码',
        prop: 'password',
        placeholder: '密码长度6-15',
        rules: [
            {
                required: true,
                message: '密码不能为空',
                trigger: 'blur'
            },
            {
                min: 6,
                max: 15,
                message: '密码长度6-15',
                trigger: 'blur'
            }
        ],
        attrs: {
            showPassword: true,
            clearable: true
        }
    },
    {
        // 下拉框
        type: 'select',
        value: '',
        label: '职位',
        prop: 'role',
        placeholder: '请选择职位',
        rules: [
            {
                required: true,
                message: '职位不能为空',
                trigger: 'blur'
            }
        ],
        attrs: {
            style: {
                width: '100%'
            }
        },
        children: [
            {
                type: 'option',
                value: '1',
                label: '经理',
            },
            {
                type: 'option',
                value: '2',
                label: '主管',
            },
            {
                type: 'option',
                value: '3',
                label: '员工',
            }
        ]
    },
    {
        type: 'checkbox-group',
        value: [],
        prop: 'like',
        label: '爱好',
        rules: [
            {
                required: true,
                message: '爱好不能为空',
                trigger: 'change'
            }
        ],
        children: [
            {
                type: 'checkbox',
                label: '足球',
                value: '1'
            },
            {
                type: 'checkbox',
                label: '篮球',
                value: '2'
            },
            {
                type: 'checkbox',
                label: '排球',
                value: '3'
            }
        ]
    },
    {
        type: 'radio-group',
        value: '',
        prop: 'gender',
        label: '性别',
        rules: [
            {
                required: true,
                message: '性别不能为空',
                trigger: 'change'
            }
        ],
        children: [
            {
                type: 'radio',
                label: '男',
                value: 'male'
            },
            {
                type: 'radio',
                label: '女',
                value: 'female'
            },
            {
                type: 'radio',
                label: '保密',
                value: 'not'
            }
        ]
    },
    {
        type: 'upload',
        prop: 'upload',
        label: '上传',
        rules: [
            {
                required: false,
                message: '不能为空',
                trigger: 'blur'
            }
        ],
        uploadAttrs: {
            action: "https://jsonplaceholder.typicode.com/posts/",
            multiple: true,
            limit: 3
        }
    },
    {
        type: 'editor',
        value: '',
        prop: 'desc',
        label: '描述',
        placeholder: '描述不能为空',
        rules: [
            {
                required: true,
                message: '描述不能为空',
                trigger: 'blur'
            },
            // {
            //     validator: checkEditor,
            //     trigger: 'change'
            // }
        ]
    }
]

const confirm = (form: FormInstance) => {
    let validate = form.validate()
    validate((valid: any) => {
        if (valid) {
            ElMessage.success('验证成功')
        } else {
            ElMessage.success('验证失败')
        }
    })
}

const cancel = (form: FormInstance) => {
    form.resetFields()
    visible.value = false
}

const onSuccess = (val: any) => {
    console.log('success')
    console.log(val)
}

</script>

<template>
    <div>
        <el-button type="primary" size="default" @click="changeVisible">open</el-button>
        <m-modal-form :isScroll="true" :onSuccess="onSuccess" :options="options" v-model:visible="visible" title="编辑用户"
            width="50%">
            <template #uploadArea>
                <div>
                    <el-button type="primary">Click to upload</el-button>
                </div>
            </template>
            <template #uploadTip>
                <div style="color: #ccc;font-size: 12px">
                    jpg/png files with a size less than 500KB.
                </div>
            </template>
            <template #footer="{ form }">
                <el-button @click="cancel(form)">取消</el-button>
                <el-button type="primary" @click="confirm(form)">
                    确认
                </el-button>
            </template>
        </m-modal-form>
    </div>
</template>

<style lang="scss" scoped></style>
