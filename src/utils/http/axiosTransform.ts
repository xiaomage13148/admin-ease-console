import {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {RequestOptions, Result} from '@/types/axios';

/**
 * 创建Axios实例选项
 */
export interface CreateAxiosOptions extends AxiosRequestConfig {
    authenticationScheme?: string;
    transform?: AxiosTransform;
    requestOptions?: RequestOptions;
}

/**
 * Axios数据转换
 */
export abstract class AxiosTransform {
    /**
     * @description: 在发送请求之前调用的函数。它可以根据需要修改请求配置。
     */
    beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

    /**
     * @description: 处理响应数据
     */
    transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

    /**
     * TODO 不知道能做什么处理 , 这个处理方式存在问题
     * @description: 请求失败处理
     */
    requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

    /**
     * @description: 请求拦截器
     */
    requestInterceptors?: (
        config: InternalAxiosRequestConfig,
        options: CreateAxiosOptions,
    ) => InternalAxiosRequestConfig;

    /**
     * @description: 响应拦截器
     */
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

    /**
     * @description: 请求拦截器错误处理
     */
    requestInterceptorsCatch?: (error: Error) => void;

    /**
     * @description: 响应拦截器错误处理
     */
    responseInterceptorsCatch?: (axiosInstance: AxiosInstance, error: Error) => Promise<never>;
}