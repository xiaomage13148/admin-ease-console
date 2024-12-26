import {defineStore} from 'pinia';
import {useStorage} from '@vueuse/core';
import {watch} from 'vue';
import {toggleDarkMode} from '@/utils/theme/theme';
import {ThemeEnum} from '@/enums/ThemeEnum';
import {useGlobSetting} from '@/hooks/useGlobSetting';
import {LayoutEnum} from '@/enums/LayoutEnum';
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
    const sidebarStatus = useStorage('sidebarStatus', SidebarStatusEnum.OPENED);
    // 侧边栏
    const sidebar = ref<Sidebar>({
        opened: sidebarStatus.value === SidebarStatusEnum.OPENED,
        withoutAnimation: false,
    });
    // 顶部菜单激活路径
    const activeTopMenuPath = useStorage('activeTopMenuPath', '');
    // 设备类型
    const device = useStorage('device', globSetting.device);

    // 监听主题变化
    watch(
        [theme, themeColor],
        ([newTheme, newThemeColor]) => {
            toggleDarkMode(newTheme === ThemeEnum.DARK);
        },
        {immediate: true},
    );

    /**
     * 改变主题
     * @param val
     */
    const changeTheme = (val: ThemeEnum): void => {
        theme.value = val;
    };

    /**
     * 改变布局
     * @param val
     */
    const changeLayout = (val: LayoutEnum): void => {
        layout.value = val;
    };

    /**
     * 改变侧边栏Logo
     * @param val
     */
    const changeSidebarLogo = (val: boolean): void => {
        sidebarLogo.value = val;
    };

    /**
     * 混合模式顶部切换
     * @param val
     */
    const changeActiveTopMenuPath = (val: string): void => {
        activeTopMenuPath.value = val;
    };

    /**
     * 打开侧边栏
     */
    const openSidebar = (): void => {
        sidebar.value.opened = true;
        sidebarStatus.value = SidebarStatusEnum.OPENED;
    };

    /**
     * 关闭侧边栏
     */
    const closeSidebar = (): void => {
        sidebar.value.opened = false;
        sidebarStatus.value = SidebarStatusEnum.CLOSED;
    };

    return {
        themeColor,
        theme,
        layout,
        sidebarLogo,
        sidebarLogoStatus: sidebarStatus,
        sidebar, activeTopMenuPath, device,

        changeTheme, changeSidebarLogo, changeLayout, changeActiveTopMenuPath, openSidebar, closeSidebar,
    };
});