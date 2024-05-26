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
            },
            {
                path: '/trend',
                component: () => import('../views/trend/index.vue')
            },
            {
                path: '/notification',
                component: () => import('../views/notification/index.vue')
            },
            {
                path: '/menu',
                component: () => import('../views/menu/index.vue')
            },
            {
                path: '/progress',
                component: () => import('../views/progress/index.vue')
            },
            {
                path: '/timepicker',
                component: () => import('../views/chooseTime/index.vue')
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router