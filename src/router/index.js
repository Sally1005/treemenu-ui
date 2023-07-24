import Vue from 'vue'
import VueRouter from 'vue-router'
import _this from "@/main.js"

Vue.use(VueRouter)

// 定义公共路由
export const constantRoutes = [
    {
        path: '/login',
        redirect: '/'
    },
    {
        path: '/',
        component: () => import('@/views/LoginView')
    },
    {
        path: '/404',
        component: () => import('@/views/404')
    },
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/sys',
        name: 'sys',
        component: () => import('@/views/HomeView'),
        children: [
            {
                path: 'home',
                name: '首页',
                component: () => import('@/views/sys-user/Home')
            },
            {
                path: 'assetTreePanel',
                name: 'tree',
                component: () => import('@/views/sys-menu/AssetTreePanel')
            }
        ]
    }
]

//创建路由实例
const createRouter = () => new VueRouter({
    routes: constantRoutes
})

const router = createRouter();

// 在需要的时候添加动态路由
function addDynamicRoutes(menuList) {
    menuList.forEach(item => {
        // 判断是否存在子路由，并递归调用自己
        if (item.children && item.children.length) {
            addDynamicRoutes(item.children)
        }else{
            const route = {
                path: item.path,
                name: item.menuName,
                //component: () => import(`@/views/sys-user/UserAddNewView`)
                component: () => import(`@/views/${item.component}`)
            }
            router.addRoute('sys',route)
            console.log("wwwwwwwwwww" + JSON.stringify(route))
        }
    })
    console.log("ssss",router.getRoutes());
}

// 重置路由
export function resetRouter(menuList) {
    addDynamicRoutes(menuList)
}

router.beforeEach((to, from, next) => {
    // 每次跳转前存入要跳转的路径当成当前选中项的id
    localStorage.setItem('currIndex',to.path);
    console.log("currIndex",to.path);
    if(_this){
        _this.$store.commit('setCurrIndex',to.path);
    }
    // 判断是否是从登录页进入的当前项目
    if (to.path === '/') {
        return next()
    }else {
        let token = localStorage.getItem('jwt');
        console.log("xxxxx",token)
        token ? next() : next('/')
    }
})

export default router
// (resolve) => require(['@/views/sys-user/Home'],resolve)