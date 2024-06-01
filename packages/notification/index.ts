import notification from './src/index.vue'
import { App } from 'vue'

const myPlugin = {
    install(app: App) {
        app.component('m-notification', notification);
    }
}

export default myPlugin
