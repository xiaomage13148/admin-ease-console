import type {App} from 'vue';
import {setupRouter} from '@/router';
import {setupStore} from '@/stores';

export default {
    install(app: App<Element>) {
        // 路由 router
        setupRouter(app);
        // 状态关联 store
        setupStore(app);
    },
};