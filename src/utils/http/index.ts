import {AxiosTransform, CreateAxiosOptions} from '@/utils/http/axiosTransform';
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {BaseResp, RequestOptions} from '@/types/axios';
import {ContentTypeEnum, RequestEnum, ResultEnum, TokenKeyEnum} from '@/enums/HttpEnum';
import {isEmpty, isNull, isString, isUndefined} from '@/utils/common/is';
import {useElMessage} from '@/hooks/useElMessage';
import {formatRequestDate, joinTimestamp, setObjToUrlParams} from '@/utils/http/help';
import {checkStatus} from '@/utils/http/checkStatus';
import {MAxios} from '@/utils/http/MAxios';
import {deepMerge} from '@/utils/common';
import {clone} from 'unocss';
import {useGlobSetting} from '@/hooks/useGlobSetting';
import {useElDialog} from '@/hooks/useElDialog';
import i18n from '@/lang';
import {useTokenStoreHook, useUserStoreHook} from '@/stores';
import {isUnauthorized} from '@/utils/common/stringJudge';

const {createDefaultMessage} = useElMessage();
const {openDialog} = useElDialog();
const globSetting = useGlobSetting();
const {t} = i18n.global;

const transform: AxiosTransform = {

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
     * 处理响应数据
     * @param res
     * @param options
     */
    transformResponseHook(res: AxiosResponse<BaseResp>, options: RequestOptions): any {
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

        const {data: resData} = res;
        if (!resData) {
            throw new Error(t('api.apiRequestFailed'));
        }
        const {status, data, message} = resData;
        // 判断接口的业务响应是否成功
        const hasSuccess = resData && Reflect.has(resData, 'status') && status === ResultEnum.SUCCESS;
        if (hasSuccess) {
            let successMsg: string = message;
            if (isNull(successMsg) || isUndefined(successMsg) || isEmpty(successMsg)) {
                successMsg = t('api.operationSuccess');
            }
            if (options?.successMessageMode === 'modal') {
                openDialog({content: successMsg});
            } else if (options?.successMessageMode === 'message') {
                createDefaultMessage({message: successMsg, type: 'success'});
            }
            return data;
        }

        let errorMsg = message;
        // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
        // 判断是否未授权
        if (isUnauthorized(status)) {
            const userStore = useUserStoreHook();
            userStore.logout().then();
        }

        // TODO 对业务异常做处理
        switch (status) {

        }

        if (options.errorMessageMode === 'modal') {
            openDialog({content: errorMsg});
        } else if (options.errorMessageMode === 'message') {
            createDefaultMessage({message: errorMsg, type: 'error'});
        }

        throw new Error(errorMsg || t('api.apiRequestFailed'));
    },

    /**
     * 请求拦截器
     * @param config
     * @param options
     */
    requestInterceptors(config: InternalAxiosRequestConfig, options: CreateAxiosOptions): InternalAxiosRequestConfig {
        const tokenStore = useTokenStoreHook();
        const token = tokenStore.getToken();
        if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
            (config as Recordable).headers.Authorization = options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token;
        }
        return config;
    },

    /**
     * 响应拦截器
     * @param res
     */
    responseInterceptors(res: AxiosResponse<any>): AxiosResponse<any> {
        return res;
    },

    /**
     * 请求拦截器错误处理
     * @param error
     */
    requestInterceptorsCatch(error: Error): void {
    },

    /**
     * 响应拦截器错误处理
     * @param axiosInstance
     * @param error
     */
    responseInterceptorsCatch(axiosInstance: AxiosInstance, error: any): Promise<never> {
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
                errMessage = t('api.apiTimeoutMessage');
            }
            if (err?.includes('Network Error')) {
                errMessage = t('api.networkExceptionMsg');
            }

            if (errMessage) {
                if (errorMessageMode === 'modal') {
                    openDialog({content: errMessage});
                } else if (errorMessageMode === 'message') {
                    createDefaultMessage({message: errMessage, type: 'error'});
                }
                return Promise.reject(error);
            }
        } catch (error) {
            throw new Error(error as unknown as string);
        }

        // 检查响应状态码
        checkStatus(error?.response?.status, msg, errorMessageMode);

        // TODO 添加自动重试机制

        return Promise.reject(error);
    },
};

function createAxios(opt?: Partial<CreateAxiosOptions>): MAxios {
    return new MAxios(
        deepMerge(
            {
                authenticationScheme: TokenKeyEnum.TOKEN,
                timeout: 10 * 1000,
                // 基础接口地址
                // baseURL: globSetting.apiUrl,
                headers: {'Content-Type': ContentTypeEnum.JSON},
                // 如果是form-data格式
                // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
                // 数据处理方式
                transform: clone(transform),
                // 配置项
                requestOptions: {
                    // 默认将prefix 添加到url
                    joinPrefix: true,
                    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
                    isReturnNativeResponse: false,
                    // 需要对返回数据进行处理
                    isTransformResponse: true,
                    // post请求的时候添加参数到url
                    joinParamsToUrl: false,
                    // 格式化提交参数时间
                    formatDate: true,
                    // 消息提示类型
                    errorMessageMode: 'message',
                    successMessageMode: 'none',
                    // 基础地址
                    apiUrl: globSetting.baseApi,
                    // 接口拼接地址
                    urlPrefix: globSetting.urlPrefix,
                    // 是否加入时间戳
                    joinTime: true,
                    // 忽略重复请求
                    ignoreCancelToken: true,
                    // 是否携带token
                    withToken: true,
                    retryRequest: {
                        isOpenRetry: true,
                        count: 5,
                        waitTime: 100,
                    },
                },
            },
            opt || {},
        ),
    );
}

export const defHttp = createAxios();