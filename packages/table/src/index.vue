<script lang="ts" setup>
import { PropType, computed, ref, onMounted, watch } from "vue"
import { TableOptions } from './types'
import { toLine } from "../../utils"
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
    // 表格配置项
    options: {
        type: Array as PropType<TableOptions[]>,
        required: true
    },
    // 表格数据
    data: {
        type: Array as PropType<any[]>,
        required: true
    },
    // 是否要有v-loading效果
    loading: {
        type: Boolean,
        default: false
    },
    // elementplus的loading相关属性
    elementLoadingText: {
        type: String,
    },
    elementLoadingIcon: {
        type: String,
    },
    elementLoadingBackground: {
        type: String,
    },
    elementLoadingSvgViewBox: {
        type: String,
    },
    // 单元格编辑的图标
    editIcon: {
        type: String,
        default: 'edit'
    },
    // 是否开启编辑行功能
    isEditRow: {
        type: Boolean,
        default: false
    },
    // 判断父组件操作项是什么，是编辑行还是删除行
    editRowIndex: {
        type: String,
        default: ''
    },
    currentPage: {
        type: Number,
        default: 1
    },
    pageSize: {
        type: Number,
        default: 10
    },
    pageSizes: {
        type: Array as PropType<number[]>,
        default: [10, 20, 30]
    },
    total: {
        type: Number,
        default: 100
    },
    // 分页组件排列方式
    paginationAlign: {
        type: String as PropType<'left' | 'center' | 'right'>,
        default: 'center'
    }
})

const emits = defineEmits(['confirm', 'cancel', 'update:editRowIndex', 'pageSizeChange', 'currentPageChange'])

// 通过计算属性来区别出非操作项列
const tableOptions = computed(() => props.options.filter(item => !item.action))

// 计算属性得出操作项
const actionOptions = computed(() => props.options.find(item => item.action === true))

const isLoading = computed(() => !(props.data && props.data.length))


// 区分点击单元格的唯一标识
const currentEdit = ref<string>('')

// 点击单元格编辑事件
const clickEdit = (scope: any) => {
    // 设置唯一标识
    currentEdit.value = scope.$index + scope.column.id
}

const check = () => {
    emits('confirm', 'check')
    currentEdit.value = ''
}

const close = () => {
    emits('cancel', 'close')
    currentEdit.value = ''
}

// 单元格编辑的点击冒泡事件
const clickEditCell = () => {
    currentEdit.value = ''
}

// 是否行编辑
// 拷贝成一份响应式table数据-因为要添加新的属性-props的数据是只读
const tableData = ref<any[]>(cloneDeep(props.data))
// 拷贝标识
const cloneEditRowIndex = ref<string>(props.editRowIndex)

// 监听父组件传递的表格数据
watch(() => props.data, val => {
    tableData.value = cloneDeep(val)
    tableData.value.forEach(item => {
        // 代表当前是否是可编辑状态
        item.rowEdit = false
    })
}, {
    deep: true
})

// 监听父组件的操作项标识
watch(() => props.editRowIndex, val => {
    if (val) {
        cloneEditRowIndex.value = val
        // console.log('标识符', cloneEditRowIndex.value === props.editRowIndex)
    }
})

// 初始化表格数据-给拷贝的表格数据添加新的属性
onMounted(() => {
    if (tableData.value && tableData.value.length) {
        tableData.value.forEach(item => {
            // 代表当前是否是可编辑状态
            item.rowEdit = false
        })
    }

})

// 子组件传了个默认值 'edit'
const editRowIndexTemp = props.editRowIndex
// 当table中某一行被点击时会触发该事件
const rowClick = (row: any, column: any) => {
    // console.log(column);
    // 判断点击的是否是操作项列的内容
    if (column.label === actionOptions.value?.label) {
        // 表格组件开启了行可编辑
        // todo：cloneEditRowIndex.value === props.editRowIndex 不管是编辑还是删除都是true。解决：使用一个常量存储props.editRowIndex，这样就不会因为父组件传过来的editRowIndex，子组件的props.editRowIndex也同步变化，最后始终为true
        // props.xxx 也会跟着 父组件传递给子组件的xxx，同步变化---vue默认
        if (props.isEditRow && cloneEditRowIndex.value === editRowIndexTemp) {
            // 设置某一行的可编辑状态
            // row是行的数据，tableData中的每个item
            row.rowEdit = !row.rowEdit
            // 重置其他行的可编辑状态
            tableData.value.map((item) => {
                if (item !== row) {
                    item.rowEdit = false
                }
            })
            // 重置按钮标识
            if (!row.rowEdit) {
                emits('update:editRowIndex', '')
            }
        }
    }
}

// 分页组件
const currentPage = ref<number>(props.currentPage)
const pageSize = ref<number>(props.pageSize)
const pageSizes = ref<number[]>(props.pageSizes)

// 一页显示多少条改变
const handleSizeChange = (pageSize: number) => {
    emits('pageSizeChange', pageSize)
}
// 页码数改变
const handleCurrentChange = (currentPage: number) => {
    emits('currentPageChange', currentPage)
}

const paginationJustifyContent = computed(() => {
    if (props.paginationAlign === 'left') {
        return 'flex-start'
    } else if (props.paginationAlign === 'center') {
        return 'center'
    } else if (props.paginationAlign === 'right') {
        return 'flex-end'
    }
})

</script>

<template>
    <el-table :data="tableData" border stripe v-loading="isLoading" :element-loading-text="elementLoadingText"
        :element-loading-spinner="elementLoadingIcon" :element-loading-svg-view-box="elementLoadingSvgViewBox"
        :element-loading-background="elementLoadingBackground" @row-click="rowClick">
        <!-- 非操作项列 -->
        <template v-for="(item, index) in tableOptions" :key="index">
            <el-table-column :prop="item.prop" :label="item.label" :align="item.align" :width="item.width">
                <template #default="scope">
                    <!-- 可编辑行状态 -->
                    <template v-if="scope.row.rowEdit">
                        <el-input v-model="scope.row[item.prop!]" size="small"></el-input>
                    </template>
                    <!-- 预览状态 -->
                    <template v-else>
                        <!-- 单元格编辑状态 -->
                        <template v-if="(scope.$index + scope.column.id) === currentEdit">
                            <div style="display: flex;">
                                <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
                                <!-- 自定义编辑单元格的勾叉区域内容 -->
                                <div @click.stop="clickEditCell">
                                    <slot name="editCell" v-if="$slots.editCell" :scope="scope"></slot>
                                    <template v-else>
                                        <div class="icons">
                                            <el-icon-check @click.stop="check" class="check"></el-icon-check>
                                            <el-icon-close @click.stop="close" class="close"></el-icon-close>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <!-- 非自定义模板 -->
                            <template v-if="!item.slot">
                                <span>{{ scope.row[item.prop!] }}</span>
                            </template>
                            <!-- 自定义模板 -->
                            <slot v-else :name="item.slot" :scope="scope"></slot>
                            <!-- 编辑图标 -->
                            <component :is="`el-icon-${toLine(editIcon)}`" v-if="item.editable"
                                @click.stop="clickEdit(scope)" class="edit">
                            </component>
                        </template>
                    </template>
                </template>
            </el-table-column>
        </template>
        <!-- 操作项列 -->
        <el-table-column v-if="actionOptions" :prop="actionOptions!.prop" :label="actionOptions!.label"
            :align="actionOptions!.align" :width="actionOptions!.width">
            <template #default="scope">
                <!-- 可编辑行状态 -->
                <slot name="editRow" v-if="scope.row.rowEdit"></slot>
                <!-- 预览状态 -->
                <slot name="action" :scope="scope" v-else></slot>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="pagination" :style="{ justifyContent: paginationJustifyContent }">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizes"
            small="small" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>

<style lang="scss" scoped>
.edit {
    width: 1em;
    height: 1em;
    position: relative;
    top: 2px;
    left: 2px;
    cursor: pointer;
}

.icons {
    display: flex;
    position: relative;
    top: 4px;

    .check {
        margin-left: 4px;
        color: red;
        cursor: pointer;
    }

    .close {
        color: green;
        cursor: pointer;
    }
}

.pagination {
    margin-top: 16px;
    display: flex;
}
</style>
