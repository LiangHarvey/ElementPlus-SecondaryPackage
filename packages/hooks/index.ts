import { ElMessage } from 'element-plus'
// 使用户复制文字
export const useCopy = (text: string) => {
    // 创建输入框
    let input = document.createElement('input')
    // 给输入框的value复制
    input.value = text
    // 追加到body里面去
    document.body.appendChild(input)
    // 进行选择输入框的操作
    input.select()
    // 执行复制操作
    document.execCommand('Copy')
    // 删除加入的输入框
    document.body.removeChild(input)
    ElMessage({
        message: '复制成功',
        type: 'success',
    })
}