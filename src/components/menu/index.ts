import { App } from 'vue'
import menu from './src/index.vue'
import infiniteMenu from './src/menu.tsx'

// 让这个组件可以通过use的形式使用
const myPlugin = {
    install(app: App) {
        app.component('m-menu', menu)
        app.component('m-infinite-menu', infiniteMenu)
    }
}

export default myPlugin
