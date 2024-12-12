import {LoginParams} from '@/types/auth';
import {defHttp} from '@/utils/http';

enum Api {
    login = '/login'
}

/**
 * 登录API
 * @param params
 */
export const loginApi = (params: LoginParams) => {
    return defHttp.post({
        url: Api.login,
        params,
    });
};