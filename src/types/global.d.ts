import type {ThemeEnum} from '@/enums/ThemeEnum';
import {LayoutEnum} from '@/enums/LayoutEnum';
import {b} from 'vite/dist/node/types.d-aGj9QkWt';
import {DeviceEnum} from '@/enums/DeviceEnum';

declare global {

    /**
     * 系统设置
     */
    interface AppSettings {
        // 标题
        title: string,
        // 版本
        version: string,
        // 端口
        port: number,
        // 基础Url
        baseApi: string,
        // 代理Url
        apiUrl: string,
        // websocket端口
        wsEndpoint: string,
        // mock服务
        mockDevServer: boolean,
        // url前缀
        urlPrefix: string,
        // 语言
        language: string,
        // 主题
        theme: ThemeEnum,
        // 主题颜色
        themeColor: string,
        // 菜单布局
        layout: LayoutEnum,
        // 侧边栏Logo
        sidebarLogo: boolean,
        // 设备类型
        device: DeviceEnum
    }

    /**
     * 本地语言
     */
    interface LocaleMessages {
        [key: string]: any;
    }

    declare type Recordable<T = any> = Record<string, T>

    /**
     * 侧边栏
     */
    interface Sidebar {
        opened: boolean,
        withoutAnimation: false
    }

    /**
     * ElMenu菜单展示模式
     */
    declare type ElMenuMode = 'horizontal' | 'vertical'
}
