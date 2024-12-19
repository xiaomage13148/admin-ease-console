import {LoginParams} from '@/types/auth';
import {defHttp} from '@/utils/http';

enum Api {
    login = '/login/userLogin',
    logout = '/login/userLogout',
}

/**
 * 登录API
 * @param params
 */
export const loginApi = (params: LoginParams): Promise<string> => {
    return defHttp.post<string>({
        url: Api.login,
        params,
    }, {successMessageMode: 'message'});
};

/**
 * 登出API
 */
export const logoutApi = (): Promise<void> => {
    return defHttp.post<void>({url: Api.logout}, {successMessageMode: 'message'});
};