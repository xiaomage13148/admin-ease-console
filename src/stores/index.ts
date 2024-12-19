import {createPinia} from 'pinia';
import type {App} from 'vue';

const store = createPinia();

// 注册store
export function setupStore(app: App<Element>) {
    app.use(store);
}

export * from './modules/app';
export * from './modules/settings';
export * from './modules/token';
export * from './modules/user';
export {store};