import {TokenKeyEnum} from '@/enums/HttpEnum';

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

    return {
        token,
        setToken,
        clearToken,
    };
});