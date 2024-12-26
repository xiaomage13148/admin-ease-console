import {RouteRecordRaw} from 'vue-router';
import {constantsRoutes} from '@/router';

// TODO 权限Store 待完善
export const usePermissionStore = defineStore('permission', () => {
    const routes = ref<RouteRecordRaw[]>(constantsRoutes);

    // 混合模式左侧菜单
    const mixLeftMenus = ref<RouteRecordRaw[]>([]);

    // const generateRoutes = (): Promise<RouteRecordRaw[]> => {
    //     return new Promise<RouteRecordRaw[]>((resolve, reject) => {
    //         try {
    //             routes.value = constantsRoutes;
    //             resolve(routes.value);
    //         } catch (e: any) {
    //             reject(e);
    //         }
    //     });
    // };

    /**
     * 混合模式菜单下根据顶部菜单路径设置左侧菜单
     * @param topMenuPath
     */
    const setMixLeftMenus = (topMenuPath: string) => {
        const matchedItem = routes.value.find((item) => item.path === topMenuPath);
        if (matchedItem && matchedItem.children) {
            mixLeftMenus.value = matchedItem.children;
        }
    };

    return {
        routes,
        mixLeftMenus,
        // generateRoutes,
        setMixLeftMenus,
    };
});