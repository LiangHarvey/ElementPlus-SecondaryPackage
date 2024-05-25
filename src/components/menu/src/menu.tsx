import { defineComponent, PropType, useAttrs } from 'vue'
import { MenuItem } from './type'
import { toLine } from '../../../utils'

export default defineComponent({
    props: {
        // 导航菜单数据
        data: {
            type: Array as PropType<MenuItem[]>,
            required: true
        },
        defaultActive: {
            type: String,
            default: ''
        },
        // menu菜单是否是路由模式
        router: {
            type: Boolean,
            default: false
        }
    },
    // 组合式api
    setup(props) {
        // 剩余props属性
        let attrs = useAttrs()
        console.log('attrs', attrs)
        // 只打印输出props选项中的属性，没有打印attrs中的
        console.log('props', props)

        // 封装一个渲染无限层级菜单的方法
        // 函数会返回一段jsx代码
        const renderMenu = (data: MenuItem[]) => {
            return data.map((item: MenuItem) => {
                // 每个菜单的图标
                item.i = `el-icon-${toLine(item.icon)}`
                let slots = {
                    title: () => {
                        return <>
                            <item.i />
                            <span>{item.name}</span>
                        </>
                    }
                }
                // 递归渲染
                if (item.children && item.children.length) {
                    return (
                        <el-sub-menu index={item.index} v-slots={slots}>
                            {renderMenu(item.children)}
                        </el-sub-menu>
                    )
                }
                // 只有一级菜单
                return (
                    <el-menu-item index={item.index}>
                        <item.i></item.i>
                        <span>{item.name}</span>
                    </el-menu-item>
                )
            })
        }

        console.log(renderMenu(props.data))

        return () => {
            return (
                <el-menu defaultActive={props.defaultActive}
                    router={props.router} {...attrs}>
                    {renderMenu(props.data)}
                </el-menu>
            )
        }
    }
})