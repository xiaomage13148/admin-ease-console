import {ConfigEnv, defineConfig, loadEnv, UserConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import {resolve} from 'path';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

import {
    name,
    version,
    engines,
    dependencies,
    devDependencies,
} from './package.json';

/** 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示 */
const __APP_INFO__ = {
    pkg: {name, version, engines, dependencies, devDependencies},
    buildTimestamp: Date.now(),
};

const pathSrc = resolve(__dirname, 'src');
export default defineConfig(({mode}: ConfigEnv): UserConfig => {
    const env = loadEnv(mode, process.cwd());
    return {
        resolve: {
            alias: {
                '@': pathSrc,
            },
        },
        css: {
            // CSS 预处理器
            preprocessorOptions: {
                // 定义全局 SCSS 变量
                scss: {
                    javascriptEnabled: true,
                    additionalData: `
                    @use "@/styles/variables.scss" as *;
                    `,
                },
            },
        },
        server: {
            // 允许IP访问
            host: '0.0.0.0',
            // 应用端口 (默认:3000)
            port: Number(env.VITE_APP_PORT),
            // 运行是否自动打开浏览器
            open: true,
            proxy: {
                /** 代理前缀为 /dev-api 的请求  */
                [env.VITE_APP_BASE_API]: {
                    changeOrigin: true,
                    // 接口地址 例如：http://vapi.youlai.tech
                    target: env.VITE_APP_API_URL,
                    rewrite: (path) =>
                        path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
                },
            },
        },
        plugins: [
            vue(),
            vueJsx(),
            UnoCss({
                hmrTopLevelAwait: false,
            }),
            AutoImport({
                // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
                imports: ['vue', '@vueuse/core', 'pinia', 'vue-router', 'vue-i18n'],
                resolvers: [
                    // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
                    ElementPlusResolver({
                        importStyle: 'sass',
                    }),
                    // 自动导入图标组件
                    IconsResolver({}),
                ],
                eslintrc: {
                    // 是否自动生成 eslint 规则，建议生成之后设置 false
                    enabled: false,
                    // 指定自动导入函数 eslint 规则的文件
                    filepath: './.eslintrc-auto-import.json',
                    globalsPropValue: true,
                },
                // 是否在 vue 模板中自动导入
                vueTemplate: true,
                // 指定自动导入函数TS类型声明文件路径 (false:关闭自动生成)
                dts: false,
            }),
            Components({
                resolvers: [
                    // 自动导入 Element Plus 组件
                    ElementPlusResolver({importStyle: 'sass'}),
                    // 自动注册图标组件
                    IconsResolver({
                        // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
                        enabledCollections: ['ep'],
                    }),
                ],
                // 指定自定义组件位置(默认:src/components)
                dirs: ['src/components', 'src/**/components'],
                // 指定自动导入组件TS类型声明文件路径 (false:关闭自动生成)
                dts: false,
            }),
            Icons({
                // 自动安装图标库
                autoInstall: true,
            }),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [resolve(pathSrc, 'assets/icons')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]',
            }),
        ],
        // 定义全局常量替换方式
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__),
        },
    };
});
