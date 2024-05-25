import { defineComponent, PropType, useAttrs } from 'vue'
import { MenuItem } from './type'
import { toLine } from '../../../utils'
import * as EleIcons from '@element-plus/icons-vue'
import './style/index.scss'

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
        },
        // 菜单数据的键名
        // 菜单标题键名
        name: {
            type: String,
            default: 'name'
        },
        // 菜单标识键名
        index: {
            type: String,
            default: 'index'
        },
        // 菜单图标键名
        icon: {
            type: String,
            default: 'icon'
        },
        // 子数据键名
        children: {
            type: String,
            default: 'children'
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
        const renderMenu = (data: any[]) => {
            return data.map((item: any) => {
                // 每个菜单的图标
                // item.i = `el-icon-${toLine(item[props.icon])}`
                item.i = (EleIcons as any)[item[props.icon]!]
                let slots = {
                    title: () => {
                        return <>
                            <item.i />
                            <span>{item[props.name]}</span>
                        </>
                    }
                }
                // 递归渲染
                if (item[props.children] && item[props.children].length) {
                    return (
                        <el-sub-menu index={item[props.index]} v-slots={slots}>
                            {renderMenu(item[props.children])}
                        </el-sub-menu>
                    )
                }
                // 只有一级菜单
                return (
                    <el-menu-item index={item[props.index]}>
                        <item.i></item.i>
                        <span>{item[props.name]}</span>
                    </el-menu-item>
                )
            })
        }

        // 打印输出的是一个数组
        // console.log(renderMenu(props.data))

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