import {AxiosTransform, CreateAxiosOptions} from '@/utils/http/axiosTransform';
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {RequestOptions, Result} from '@/types/axios';
import {RequestEnum, ResultEnum} from '@/enums/HttpEnum';
import {isEmpty, isNull, isString, isUndefined} from '@/utils/common/is';
import {useElMessage} from '@/hooks/useElMessage';
import {useI18n} from 'vue-i18n';
import {formatRequestDate, joinTimestamp, setObjToUrlParams} from '@/utils/http/help';

const {createDefaultMessage} = useElMessage();

const transform: AxiosTransform = {
    /**
     * 处理响应数据
     * @param res
     * @param options
     */
    transformResponseHook(res: AxiosResponse<Result>, options: RequestOptions): any {
        const {t} = useI18n();
        const {isTransformResponse, isReturnNativeResponse} = options;
        // 是否返回原生响应头 不做处理
        if (isReturnNativeResponse) {
            return res;
        }

        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (!isTransformResponse) {
            return res.data;
        }

        const {data} = res;
        if (!data) {
            throw new Error(t('api.apiRequestFailed'));
        }
        const {code, result, message} = data;
        // 判断接口的业务响应是否成功
        const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
        if (hasSuccess) {
            let successMsg: string = message;
            if (isNull(successMsg) || isUndefined(successMsg) || isEmpty(successMsg)) {
                successMsg = t('api.operationSuccess');
            }
            if (options.successMessageMode === 'modal') {
                // TODO 待完善
            } else if (options.successMessageMode === 'message') {
                createDefaultMessage({message: successMsg, type: 'success'});
            }
            return result;
        }

        let errorMsg = message;
        // // 在此处根据自己项目的实际情况对不同的code执行不同的操作
        // // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
        // let timeoutMsg = '';
        // switch (code) {
        //     case ResultEnum.TIMEOUT:
        //         timeoutMsg = t('sys.api.timeoutMessage');
        //         const userStore = useUserStoreWithOut();
        //         // 被动登出，带redirect地址
        //         userStore.logout(false);
        //         break;
        //     default:
        //         if (message) {
        //             timeoutMsg = message;
        //         }
        // }

        if (options.errorMessageMode === 'modal') {
            // TODO 待完善
        } else if (options.errorMessageMode === 'message') {
            createDefaultMessage({message: errorMsg, type: 'error'});
        }

        throw new Error(errorMsg || t('api.apiRequestFailed'));
    },

    /**
     * 在发送请求之前调用的函数
     * @param config
     * @param options
     */
    beforeRequestHook(config: AxiosRequestConfig, options: RequestOptions): AxiosRequestConfig {
        const {
            apiUrl,
            joinPrefix,
            joinParamsToUrl,
            formatDate,
            joinTime = true,
            urlPrefix,
        } = options;

        if (joinPrefix) {
            config.url = `${urlPrefix}${config.url}`;
        }

        if (apiUrl && isString(apiUrl)) {
            config.url = `${apiUrl}${config.url}`;
        }

        const params = config.params || {};
        const data = config.data || false;

        // 格式化时间参数
        formatDate && data && !isString(data) && formatRequestDate(data);
        if (config.method?.toUpperCase() === RequestEnum.GET) {
            if (!isString(params)) {
                // 对于不是字符串，将时间戳_t添加到属性中
                config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
            } else {
                // 是字符串
                // 兼容restful风格
                config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
                config.params = undefined;
            }
        } else {
            if (!isString(params)) {
                formatDate && formatRequestDate(params);
                if (Reflect.has(config, 'data') && config.data && (Object.keys(config.data).length > 0 || config.data instanceof FormData)) {
                    // 检查data是否存在
                    config.data = data;
                    config.params = params;
                } else {
                    // 非GET请求如果没有提供data，则将params视为data
                    config.data = params;
                    config.params = undefined;
                }
                if (joinParamsToUrl) {
                    // 拼接请求参数到url中
                    config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
                }
            } else {
                // 兼容restful风格
                config.url = config.url + params;
                config.params = undefined;
            }
        }
        return config;
    },


    /**
     * 请求之前的拦截器
     * @param config
     * @param options
     */
    requestInterceptors(config: InternalAxiosRequestConfig, options: CreateAxiosOptions): InternalAxiosRequestConfig {
        // TODO 待完善
        return config;
    },

    /**
     * 请求之后的拦截器
     * @param res
     */
    responseInterceptors(res: AxiosResponse<any>): AxiosResponse<any> {
        return res;
    },

    /**
     * 请求之前的拦截器错误处理
     * @param error
     */
    requestInterceptorsCatch(error: Error): void {
    },

    /**
     * 请求之后的拦截器错误处理
     * TODO error: any类型推断需要完善
     * @param axiosInstance
     * @param error
     */
    responseInterceptorsCatch(axiosInstance: AxiosInstance, error: any): Promise<never> {
        const {t} = useI18n();
        const {response, code, message, config} = error;
        const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
        const msg: string = response?.data?.error?.message ?? '';
        const err: string = error?.toString?.() ?? '';
        let errMessage = '';

        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        try {
            if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
                errMessage = t('sys.api.apiTimeoutMessage');
            }
            if (err?.includes('Network Error')) {
                errMessage = t('sys.api.networkExceptionMsg');
            }

            if (errMessage) {
                if (errorMessageMode === 'modal') {
                    // TODO 待完善
                } else if (errorMessageMode === 'message') {
                    createDefaultMessage({message: errMessage, type: 'error'});
                }
                return Promise.reject(error);
            }
        } catch (error) {
            throw new Error(error as unknown as string);
        }

        // TODO 检查状态checkStatus

        return Promise.reject(error);
    },
};