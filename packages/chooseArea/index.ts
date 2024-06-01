import chooseArea from './src/index.vue'
import { App } from 'vue'

// 让这个组件可以通过use的形式使用
// 要么是一个install方法，要么是一个有install方法属性的对象
export default {
    install(app: App) {
        app.component('m-choose-area', chooseArea);
    }
}