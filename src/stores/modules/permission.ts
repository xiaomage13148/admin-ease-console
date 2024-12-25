import {RouteRecordRaw} from 'vue-router';
import {constantsRoutes} from '@/router';

export const usePermissionStore = defineStore('permission', () => {
    const routes = ref<RouteRecordRaw[]>(constantsRoutes);

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
        // generateRoutes,
    };
});