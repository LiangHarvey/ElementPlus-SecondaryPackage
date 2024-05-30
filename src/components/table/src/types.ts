export interface TableOptions {
    // 表头
    label: string,
    // 字段名称
    prop?: string,
    width?: string | number,
    align?: 'left' | 'center' | 'right',
    // 自定义模板
    slot?: string,
    // 是否有操作项列
    action?: boolean,
    // 是否有可编辑单元格
    editable?: boolean
}