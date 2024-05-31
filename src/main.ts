import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from './utils'
import mUI from './components/index.ts'
// import { components } from './components/index.ts'
import './mock'

const app = createApp(App)

// 全局注册图标
for (let i in Icons) {
    app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}


app.use(router).use(ElementPlus)
app.use(mUI)
// components.forEach(item => app.use(item))
app.mount('#app')

