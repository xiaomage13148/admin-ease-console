import {createRouter, createWebHistory} from 'vue-router';
import type {App} from 'vue';
import Login from '@/views/login/index.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: '/',
            redirect: to => {
                return {path: '/login'};
            },
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
    ],
});

// 注册router
export function setupRouter(app: App<Element>) {
    app.use(router);
}

export default router;
