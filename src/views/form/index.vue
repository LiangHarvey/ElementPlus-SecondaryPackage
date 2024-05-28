<script lang="ts" setup>
import { } from "vue"
import { FormOptions } from '../../components/form/src/types/types.ts'
import { ElMessage, ElMessageBox } from 'element-plus'

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
                trigger: 'blur'
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
                trigger: 'blur'
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
                required: true,
                message: '不能为空',
                trigger: 'blur'
            }
        ],
        uploadAttrs: {
            action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
            multiple: true
        }
    }
]

// 上传处理函数
const handleRemove = (file: any, fileList: any) => {
    console.log('handleRemove')
    console.log(file, fileList)
}
const handlePreview = (file: any) => {
    console.log('handlePreview')
    console.log(file)
}
const beforeRemove = (val: any) => {
    console.log('beforeRemove')
    return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`)
}
const handleExceed = (val: any) => {
    console.log('handleExceed', val)
    ElMessage.warning(
        `The limit is 3, you selected ${val.files.length
        } files this time, add up to ${val.files.length + val.fileList.length} totally`
    )
}
const handleSuccess = (val: any) => {
    console.log('success')
    console.log(val)
}
const handleChange = (val: any) => {
    console.log('change')
    console.log(val)
}
const handleBeforeUpload = (val: any) => {
    console.log('handleBeforeUpload')
    console.log(val)
}
</script>

<template>
    <div class="">
        <m-form :options="options" label-width="100px" label-position="right" @on-change="handleChange"
            @before-upload="handleBeforeUpload" @on-preview="handlePreview" @on-remove="handleRemove"
            @before-remove="beforeRemove" @on-success="handleSuccess" @on-exceed="handleExceed">
            <!-- 上传插槽 -->
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
        </m-form>
    </div>
</template>

<style lang="scss" scoped></style>
