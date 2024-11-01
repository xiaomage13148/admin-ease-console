import type {ThemeEnum} from '@/enums/ThemeEnum';

declare global {

    /**
     * 系统设置
     */
    interface AppSettings {
        // 标题
        title: string,
        // 版本
        version: string,
        // 语言
        language: string,
        // 主题
        theme: ThemeEnum,
        // 主题颜色
        themeColor: string
    }

    /**
     * 本地语言
     */
    interface LocaleMessages {
        [key: string]: any;
    }

    declare type Recordable<T = any> = Record<string, T>
}
