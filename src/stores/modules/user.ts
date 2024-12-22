import {store, useTokenStoreHook} from '@/stores';
import {isEmpty} from '@/utils/common/is';
import {logoutApi} from '@/api/auth';
import router from '@/router';
import {PagesEnum} from '@/enums/PagesEnum';

export const useUserStore = defineStore('user', () => {
    const tokenStore = useTokenStoreHook();
    const logout = async (): Promise<void> => {
        if (!isEmpty(tokenStore.token)) {
            try {
                await logoutApi();
            } catch {

            }
        }

        tokenStore.clearToken();
        // 重定向到首页
        await router.replace(PagesEnum.LOGIN);
    };

    return {
        logout,
    };
});

/**
 * 在组件外部使用
 */
export const useUserStoreHook = () => useUserStore(store);