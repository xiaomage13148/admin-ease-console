import type {App} from 'vue';
import {setupRouter} from '@/router';
import {setupStore} from '@/stores';
import {setupI18n} from '@/lang';
import {setupElIcons} from '@/plugins/icons';

export default {
    install(app: App<Element>) {
        // 路由 router
        setupRouter(app);
        // 状态关联 store
        setupStore(app);
        // 国际化 i18n
        setupI18n(app);
        // element plus icon
        setupElIcons(app);
    },
};