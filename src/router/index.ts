import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'
import Container from '../components/container/src/index.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Container,
        children: [
            {
                path: '/',
                component: Home
            },
            {
                path: '/choose',
                component: () => import('../views/chooseIcon/index.vue')
            },
            {
                path: '/chooseArea',
                component: () => import('../views/chooseArea/index.vue')
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router