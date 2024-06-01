// 列表内容中的每项类型
export interface ListItem {
    // 头像
    avatar?: string,
    title?: string,
    desc?: string,
    time?: string,
    // 标签内容
    tag?: string,
    tagType?: '' | 'success' | 'info' | 'warning' | 'danger'
}

// 列表内容
export interface ListOptions {
    title: string,
    content: ListItem[]
}

// 操作选项
export interface ActionOptions {
    text: string,
    icon?: string
}