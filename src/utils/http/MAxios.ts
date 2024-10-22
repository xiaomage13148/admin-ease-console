import axios, {AxiosInstance} from 'axios';
import {CreateAxiosOptions} from '@/utils/http/axiosTransform';

export class MAxios {
    private axiosInstance: AxiosInstance;

    private readonly options: CreateAxiosOptions;

    constructor(options: CreateAxiosOptions) {
        this.options = options;
        this.axiosInstance = axios.create(options);
    }

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


    }
}