import list from './src/index.vue'
import { App } from 'vue'

// 让这个组件可以通过use的形式使用
const myPlugin = {
    install(app: App) {
        app.component('m-list', list);
    }
}

export default myPlugin
