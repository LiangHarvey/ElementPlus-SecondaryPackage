import { App } from 'vue'
import table from './src/index.vue'

// 让这个组件可以通过use的形式使用
const myPlugin = {
    install(app: App) {
        app.component('m-table', table)
    }
}

export default myPlugin
