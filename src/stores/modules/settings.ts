import {defineStore} from 'pinia';
import {useStorage} from '@vueuse/core';
import {watch} from 'vue';
import {toggleDarkMode} from '@/utils/theme/theme';
import {ThemeEnum} from '@/enums/ThemeEnum';
import {useGlobSetting} from '@/hooks/useGlobSetting';
import {LayoutEnum} from '@/enums/LayoutEnum';
import SidebarLogo from '@/layout/components/Sidebar/components/SidebarLogo.vue';
import {SidebarStatusEnum} from '@/enums/SidebarStatusEnum';

const globSetting = useGlobSetting();

export const useSettingsStore = defineStore('setting', () => {
    // 主题颜色
    const themeColor = useStorage<string>('themeColor', globSetting.themeColor);
    // 主题
    const theme = useStorage<string>('theme', globSetting.theme);
    // 菜单布局
    const layout = useStorage('layout', globSetting.layout);
    // 侧边栏Logo
    const sidebarLogo = useStorage('sidebarLogo', globSetting.sidebarLogo);
    // 侧边栏状态
    const sidebarLogoStatus = useStorage('sidebarLogoStatus', SidebarStatusEnum.OPENED);
    // 侧边栏
    const sidebar = ref<Sidebar>({
        opened: sidebarLogoStatus.value === SidebarStatusEnum.OPENED,
        withoutAnimation: false,
    });

    // 监听主题变化
    watch(
        [theme, themeColor],
        ([newTheme, newThemeColor]) => {
            toggleDarkMode(newTheme === ThemeEnum.DARK);
        },
        {immediate: true},
    );

    const changeTheme = (val: ThemeEnum): void => {
        theme.value = val;
    };

    const changeLayout = (val: LayoutEnum): void => {
        layout.value = val;
    };

    const changeSidebarLogo = (val: boolean): void => {
        sidebarLogo.value = val;
    };

    return {
        themeColor, theme, changeTheme, layout, changeLayout, sidebarLogo, changeSidebarLogo, sidebarLogoStatus, sidebar,
    };
});