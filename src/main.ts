import './assets/main.css';

import {createApp} from 'vue';
import setupPlugins from '@/plugins/index';


import App from './App.vue';

// 样式
import 'element-plus/dist/index.css';
import 'virtual:uno.css';
import 'animate.css';

const app = createApp(App);

// 注册插件
app.use(setupPlugins);

app.mount('#app');
