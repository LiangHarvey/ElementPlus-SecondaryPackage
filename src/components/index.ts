// 统一导出
import { App } from 'vue'
import chooseArea from './chooseArea/index.ts'
import chooseIcon from './chooseIcon/index.ts'
import trend from './trend/index.ts'
import notification from './notification/index.ts'
import list from './list/index.ts'
import menu from './menu/index.ts'
import progress from './progress/index.ts'
import chooseTime from './chooseTime/index.ts'
import chooseDate from './chooseDate/index.ts'
import chooseCity from './chooseCity/index.ts'
import form from './form/index.ts'
import modalForm from './modalForm/index.ts'
import table from './table/index.ts'

// 哪些install函数需要被use
export const components = [chooseArea, chooseIcon, trend, notification, list, menu, progress, chooseTime, chooseDate, chooseCity, form, modalForm, table]

// 去使用每个组件中的installapp
export default {
    install(app: App) {
        components.forEach(item => {
            app.use(item)
        })
    }
}


