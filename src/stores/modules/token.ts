import {TokenKeyEnum} from '@/enums/HttpEnum';
import {store} from '@/stores';

export const useTokenStore = defineStore('token', () => {
    const token = useStorage(TokenKeyEnum.TOKEN, '', localStorage);

    /**
     * 设置Token
     * @param value
     */
    const setToken = (value: string): void => {
        token.value = value;
    };

    /**
     * 清空Token
     */
    const clearToken = () => {
        token.value = '';
    };

    const getToken = (): string => {
        return token.value;
    };

    return {
        token,
        setToken,
        clearToken,
        getToken,
    };
});

export const useTokenStoreHook = () => useTokenStore(store);