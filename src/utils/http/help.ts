import {isFunction, isObject, isString} from '@/utils/common/is';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * 重载签名 用于类型推导
 * @param join
 * @param restful
 */
export function joinTimestamp<T extends boolean>(join: boolean, restful: T): T extends true ? string : object;

/**
 * 加入时间戳
 * @param join 是否加入
 * @param restful 是否是restful风格
 */
export function joinTimestamp(join: boolean, restful: boolean = false): string | object {
    if (!join) {
        return restful ? '' : {};
    }
    const now = new Date().getDate();
    if (restful) {
        return `?_t=${now}`;
    }
    return {_t: now};
}


/**
 * 格式化请求参数时间
 * @param params
 */
export function formatRequestDate(params: Recordable): void {
    if (Object.prototype.toString.call(params) !== '[object Object]') {
        return;
    }

    for (const key in params) {
        // 检查是否存在format方法
        const format = params[key]?.format ?? null;
        if (format && isFunction(format)) {
            params[key] = params[key].format(DATE_TIME_FORMAT);
        }

        // 对string类型做处理
        if (isString(key)) {
            const value = params[key];
            if (value) {
                try {
                    params[key] = isString(value) ? value.trim() : value;
                } catch (e: any) {
                    throw new Error(e);
                }
            }
        }

        // 依然是对象时递归调用
        if (isObject(params[key])) {
            formatRequestDate(params[key]);
        }
    }
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
    let parameters = '';
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
    }
    parameters = parameters.replace(/&$/, '');
    return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}