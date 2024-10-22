import {AxiosRequestConfig} from 'axios';

const pendingMap = new Map<string, AbortController>();

const getPendingUrl = (config: AxiosRequestConfig): string => {
    return [config.method, config.url].join('&');
};

export class AxiosCanceler {
    /**
     * 清除所有等待中的请求
     */
    public removeAllPending(): void {
        pendingMap.forEach(abortController => {
            if (abortController) {
                abortController.abort();
            }
        });
        this.reset();
    }

    /**
     * 重置
     */
    public reset(): void {
        pendingMap.clear();
    }

    /**
     * 移除请求
     * @param config
     */
    public removePending(config: AxiosRequestConfig): void {
        const url = getPendingUrl(config);
        if (pendingMap.has(url)) {
            const abortController = pendingMap.get(url);
            if (abortController) {
                abortController.abort();
            }
            pendingMap.delete(url);
        }
    }

    public addPending(config: AxiosRequestConfig): void {

    }
}