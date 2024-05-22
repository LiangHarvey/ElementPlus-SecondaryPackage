// 把驼峰转换成横杆链接
export const toLine = (value: string) => {
    return value.replace(/(A-Z)g/, '-$1').toLocaleLowerCase()
}