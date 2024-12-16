import {LoginParams} from '@/types/auth';
import {defHttp} from '@/utils/http';

enum Api {
    login = '/login/userLogin'
}

/**
 * 登录API
 * @param params
 */
export const loginApi = (params: LoginParams): Promise<string> => {
    return defHttp.post<string>({
        url: Api.login,
        params,
    }, {successMessageMode: 'modal'});
};