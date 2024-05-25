// 统一导出
import chooseArea from './chooseArea/index.ts'
import chooseIcon from './chooseIcon/index.ts'
import trend from './trend/index.ts'
import notification from './notification/index.ts'
import list from './list/index.ts'
import menu from './menu/index.ts'
import { App } from 'vue'

// 哪些install函数需要被use
export const components = [chooseArea, chooseIcon, trend, notification, list, menu]

// 去使用每个组件中的installapp
export default {
    install(app: App) {
        components.forEach(item => {
            app.use(item)
        })
    }
}


