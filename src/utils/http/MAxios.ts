import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {AxiosTransform, CreateAxiosOptions} from '@/utils/http/axiosTransform';
import {AxiosCanceler} from '@/utils/http/axiosCancel';
import {cloneDeep} from 'lodash-es';
import {RequestOptions, BaseResp} from '@/types/axios';
import {ContentTypeEnum, RequestEnum} from '@/enums/HttpEnum';
import qs from 'qs';
import {isFunction} from '@/utils/common/is';

export class MAxios {
    private axiosInstance: AxiosInstance;

    private readonly options: CreateAxiosOptions;

    constructor(options: CreateAxiosOptions) {
        this.options = options;
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }

    /**
     * 拦截器配置
     * @private
     */
    private setupInterceptors() {
        const {axiosInstance, options: {transform}} = this;
        if (!transform) {
            return;
        }
        const {
            requestInterceptors,
            requestInterceptorsCatch,
            responseInterceptors,
            responseInterceptorsCatch,
        } = transform;

        const axiosCanceler = new AxiosCanceler();

        // 请求拦截器配置处理
        this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const requestOptions = (config as unknown as any).requestOptions ?? this.options.requestOptions;
            const ignoreCancelToken = requestOptions?.ignoreCancelToken ?? true;
            !ignoreCancelToken && axiosCanceler.addPending(config);
            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config, this.options);
            }
            return config;
        }, undefined);

        // 请求拦截器错误捕获
        requestInterceptorsCatch
        && isFunction(requestInterceptorsCatch)
        && this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

        // 响应拦截器配置处理
        this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>): AxiosResponse<any> => {
            res && axiosCanceler.removePending(res.config);
            if (responseInterceptors && isFunction(responseInterceptors)) {
                res = responseInterceptors(res);
            }
            return res;
        }, undefined);

        // 响应拦截器错误捕获
        responseInterceptorsCatch
        && isFunction(responseInterceptorsCatch)
        && this.axiosInstance.interceptors.response.use(undefined, (error: any) => {
            return responseInterceptorsCatch(axiosInstance, error);
        });
    }

    /**
     * 创建axios实例
     * @param config
     * @private
     */
    private createAxios(config: CreateAxiosOptions) {
        this.axiosInstance = axios.create(config);
    }

    /**
     * 获取transform
     * @private
     */
    private getTransform(): AxiosTransform | undefined {
        const {transform} = this.options;
        return transform;
    }

    /**
     * 获取axios实例
     */
    public getAxios(): AxiosInstance {
        return this.axiosInstance;
    }

    /**
     * axios配置
     * @param config
     */
    public configAxios(config: CreateAxiosOptions) {
        if (!this.axiosInstance) {
            return;
        }
        this.createAxios(config);
    }

    /**
     * 设置请求头
     * @param header
     */
    public setHeader(header: any) {
        if (!this.axiosInstance) {
            return;
        }
        Object.assign(this.axiosInstance.defaults.headers, header);
    }

    /**
     * 支持FormData
     * @param config
     */
    public supportFormData(config: AxiosRequestConfig): AxiosRequestConfig<any> {
        const headers = config.headers || this.options.headers;
        const contentType = headers?.['Content-Type'] || headers?.['content-type'];

        if (contentType !== ContentTypeEnum.FORM_URLENCODED
            || !Reflect.has(config, 'data')
            || config.method?.toUpperCase() === RequestEnum.GET) {
            return config;
        }

        return {
            ...config, data: qs.stringify(config.data, {arrayFormat: 'brackets'}),
        };
    }

    /**
     * get请求
     * @param config
     * @param options
     */
    public get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({...config, method: 'GET'}, options);
    }

    /**
     * post请求
     * @param config
     * @param options
     */
    public post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({...config, method: 'POST'}, options);
    }

    /**
     * put请求
     * @param config
     * @param options
     */
    public put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({...config, method: 'PUT'}, options);
    }

    /**
     * delete请求
     * @param config
     * @param options
     */
    public delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({...config, method: 'DELETE'}, options);
    }

    /**
     * request请求
     * @param config
     * @param options
     */
    public request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        let conf: CreateAxiosOptions = cloneDeep(config);
        // cancelToken 如果被深拷贝，会导致最外层无法使用cancel方法来取消请求
        if (config.cancelToken) {
            conf.cancelToken = config.cancelToken;
        }
        if (config.signal) {
            conf.signal = config.signal;
        }
        const transform = this.getTransform();
        const {requestOptions} = this.options;
        const opt: RequestOptions = Object.assign({}, requestOptions, options);

        const {beforeRequestHook, requestCatchHook, transformResponseHook} = transform || {};

        if (beforeRequestHook && isFunction(beforeRequestHook)) {
            conf = beforeRequestHook(conf, opt);
        }
        conf.requestOptions = opt;
        conf = this.supportFormData(conf);

        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<BaseResp>>(conf)
                .then((res: AxiosResponse<BaseResp>) => {
                    if (transformResponseHook && isFunction(transformResponseHook)) {
                        try {
                            const ret = transformResponseHook(res, opt);
                            resolve(ret);
                        } catch (err) {
                            reject(err || new Error('request error'));
                        }
                        return;
                    }
                    resolve(res as unknown as Promise<T>);
                })
                .catch((e: Error | AxiosError) => {
                    if (requestCatchHook && isFunction(requestCatchHook)) {
                        reject(requestCatchHook(e, opt));
                        return;
                    }
                    if (axios.isAxiosError(e)) {
                        // TODO axios错误处理
                    }
                    reject(e);
                });
        });
    }
}