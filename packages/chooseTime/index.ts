import chooseTime from './src/index.vue'
import { App } from 'vue'

export default {
    install(app: App) {
        app.component('m-choose-time', chooseTime)
    }
}