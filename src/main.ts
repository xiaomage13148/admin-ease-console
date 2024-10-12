import {createApp} from 'vue';
import setupPlugins from '@/plugins/index';


import App from './App.vue';

// 本地SVG图标
import 'virtual:svg-icons-register';

// 样式
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/dist/index.css';
import 'uno.css';
import 'animate.css';

const app = createApp(App);

// 注册插件
app.use(setupPlugins);
app.mount('#app');
