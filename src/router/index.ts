import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import type {App} from 'vue';

// 路由懒加载
const Login = () => import('@/views/login/index.vue');
const Layout = () => import('@/layout/index.vue');

// 静态路由
export const constantsRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        component: Layout,
        children: [
            //  TODO 菜单路由测试
            {
                path: 'login',
                component: Login,
                name: 'login',
                meta: {
                    title: '根目录-登录页-01',
                    icon: 'homepage',
                    affix: true,
                    keepAlive: true,
                    hidden: false,
                },
            },
            {
                path: 'login',
                component: Login,
                name: 'login',
                meta: {
                    title: '根目录-登录页-02',
                    icon: 'homepage',
                    affix: true,
                    keepAlive: true,
                    hidden: false,
                },
            },
        ],
        meta: {hidden: false , title: '根目录'},
    },

    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {hidden: false, icon: 'file', title: '登录页'},
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: constantsRoutes,
});

// 注册router
export function setupRouter(app: App<Element>) {
    app.use(router);
}

export default router;
