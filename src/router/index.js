import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/sys',
        component: () => import('../views/HomeView.vue'),
        //redirect: '/',
        children: [
            {
                path: 'index',
                name: '首页', // /sys/index
                component: () => import('../views/sys-user/Index.vue')
            },
            {
                path: 'user/add-new', // /sys/user/add-new
                component: () => import('../views/sys-user/UserAddNewView.vue')
            },
            {
                path: 'user/list', // /sys/user/list
                component: () => import('../views/sys-user/UserListView.vue')
            },
            {
                path: 'menu/year', // /sys/menu/year/list
                component: () => import('../views/sys-menu/YearMenuView.vue')
            },
            {
                path: 'menu/quarter', // /sys/menu/quarter/list
                component: () => import('../views/sys-menu/QuarterMenuView.vue')
            },
            {
                path: 'menu/month', // /sys/menu/month/list
                component: () => import('../views/sys-menu/MonthMenuView.vue')
            },
        ]
    },
    {
        path: '/',
        component: LoginView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
