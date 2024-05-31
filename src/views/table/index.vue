<script lang="ts" setup>
import { ref, onBeforeMount } from "vue"
import { TableOptions } from "../../components/table/src/types"
import axios from 'axios'

// 表格配置项
let options: TableOptions[] = [
    {
        label: '日期',
        prop: 'date',
        align: 'center',
        slot: 'date',
        editable: true
    },
    {
        label: '姓名',
        prop: 'name',
        align: 'center',
        slot: 'name'
    },
    {
        label: '地址',
        prop: 'address',
        align: 'center',
        editable: true
    },
    {
        label: '操作',
        action: true,
        align: 'center',
    }
]

interface TableData {
    date: string,
    name: string,
    address: string
}

// 表格数据
const tableData = ref<TableData[]>()
// tableData.value = [
//     {
//         date: '2016-05-03',
//         name: 'Tom',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//         date: '2016-05-02',
//         name: 'Tom',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//         date: '2016-05-04',
//         name: 'Tom',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//         date: '2016-05-01',
//         name: 'Tom',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
// ]
// 表格数据
// setTimeout(() => {
//     console.log('父组件变化');
//     tableData.value = [
//         {
//             date: '2016-15-13',
//             name: 'Tom',
//             address: 'No. 189, Grove St, Los Angeles',
//         },
//         {
//             date: '2016-05-02',
//             name: 'Tom',
//             address: 'No. 189, Grove St, Los Angeles',
//         },
//         {
//             date: '2016-05-04',
//             name: 'Tom',
//             address: 'No. 189, Grove St, Los Angeles',
//         },
//         {
//             date: '2016-05-01',
//             name: 'Tom',
//             address: 'No. 189, Grove St, Los Angeles',
//         },
//     ]
// }, 5000)

// 子组件触发emit事件
const handleCheck = (e: any) => {
    console.log(e)
}

const handleClose = (e: any) => {
    console.log(e)
}

// 编辑行的按钮标识
const editRowIndex = ref<string>('edit')

// 操作项列
const handleEdit = (scope: any) => {
    editRowIndex.value = 'edit'
}

const handleDelete = () => {
    editRowIndex.value = 'delete'
}

// 分页
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>()

const getData = async () => {
    await axios.post('/api/list', {
        current: currentPage.value,
        pageSize: pageSize.value
    }).then(res => {
        tableData.value = res.data.data.rows
        total.value = res.data.data.total
    })
}

onBeforeMount(() => {
    getData()
})

const pageSizeChange = (val: number) => {
    pageSize.value = val
    getData()
}

const currentPageChange = (val: number) => {
    currentPage.value = val
    getData()
}


</script>

<template>
    <div class="">
        <m-table paginationAlign="left" @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange"
            :currentPage="currentPage" :pageSize="pageSize" :total="total" @confirm="handleCheck" @cancel="handleClose"
            v-model:editRowIndex="editRowIndex" isEditRow :options="options" :data="tableData" :loading="true"
            elementLoadingText="加载中" elementLoadingBackground="rgba(0,0,0,0.4)">
            <!-- 自定义模板插槽 -->
            <template #date="{ scope }">
                <el-icon-timer />
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
            <template #name="{ scope }">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #default>
                        <div>name: {{ scope.row.name }}</div>
                        <div>address: {{ scope.row.address }}</div>
                    </template>
                    <template #reference>
                        <el-tag>{{ scope.row.name }}</el-tag>
                    </template>
                </el-popover>
            </template>
            <!-- 操作插槽 -->
            <template #editRow="{ scope }">
                <el-button type="primary" size="small">确认</el-button>
                <el-button type="danger" size="small">取消</el-button>
            </template>
            <template #action="{ scope }">
                <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleDelete">删除</el-button>
            </template>
            <!-- 自定义编辑单元格 -->
            <!-- <template #editCell="{ scope }">
                <el-button type="primary" size="small" @click="handleClose(options)">确认</el-button>
            </template> -->
        </m-table>
    </div>
</template>

<style lang="scss" scoped>
svg {
    width: 1em;
    height: 1em;
}
</style>
