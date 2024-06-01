import trend from './src/index.vue'
import { App } from 'vue'

const myPlugin = {
    install(app: App) {
        app.component('m-trend', trend);
    }
}

export default myPlugin
