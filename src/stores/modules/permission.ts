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

    return {
        routes,
        mixLeftMenus,
        // generateRoutes,
    };
});