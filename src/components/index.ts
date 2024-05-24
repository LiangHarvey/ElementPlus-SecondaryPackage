// 统一导出
import chooseArea from './chooseArea/index.ts'
import chooseIcon from './chooseIcon/index.ts'
import { App } from 'vue'

export const components = [chooseArea, chooseIcon]

// 去使用每个组件中的installapp
export default {
    install(app: App) {
        components.forEach(item => {
            app.use(item)
        })
    }
}


