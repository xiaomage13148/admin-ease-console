import type {ThemeEnum} from '@/enums/ThemeEnum';

/**
 * App 设置
 */
export interface AppSettings {
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