import {defineStore} from 'pinia';
import {useStorage} from '@vueuse/core';
import defaultSettings from '@/settings';
import {watch} from 'vue';
import {toggleDarkMode} from '@/utils/theme';
import {ThemeEnum} from '@/enums/ThemeEnum';

export const useSettingsStore = defineStore('setting', () => {
    // 主题颜色
    const themeColor = useStorage<string>('themeColor', defaultSettings.themeColor);
    // 主题
    const theme = useStorage<string>('theme', defaultSettings.theme);

    // 监听主题变化
    watch(
        [theme, themeColor],
        ([newTheme, newThemeColor]) => {
            toggleDarkMode(newTheme === ThemeEnum.DARK);
        },
        {immediate: true},
    );


    function changeTheme(val: string) {
        theme.value = val;
    }

    return {
        themeColor, theme, changeTheme,
    };
});