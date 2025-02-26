import {VNode} from 'vue';
import {JSX} from 'vue/jsx-runtime';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export type SuccessMessageMode = ErrorMessageMode;

export interface RequestOptions {
    // 拼接请求参数到url
    joinParamsToUrl?: boolean;
    // 格式化请求参数时间
    formatDate?: boolean;
    // 是否处理请求结果
    isTransformResponse?: boolean;
    // 是否返回原生响应头
    isReturnNativeResponse?: boolean;
    // Whether to join url
    joinPrefix?: boolean;
    // 基础地址
    apiUrl?: string;
    // 请求拼接路径
    urlPrefix?: string;
    // Error message prompt type
    errorMessageMode?: ErrorMessageMode;
    // Success message prompt type
    successMessageMode?: SuccessMessageMode;
    // Whether to add a timestamp
    joinTime?: boolean;
    ignoreCancelToken?: boolean;
    // Whether to send token in header
    withToken?: boolean;
    // 请求重试机制
    retryRequest?: RetryRequest;
}

export interface RetryRequest {
    isOpenRetry: boolean;
    count: number;
    waitTime: number;
}

export interface BaseResp<T = any> {
    status: string;
    message: string;
    data: T;
}

/**
 * ElMessage配置选项
 */
export interface ElMessageOptions {
    message: string | VNode;
    plain?: boolean;
    dangerouslyUseHTMLString?: boolean;
    duration?: number;
    type: 'success' | 'warning' | 'info' | 'error';
}

/**
 * ElDialog配置选项
 */
export interface ElDialogOptions {
    // 对话框标题
    title?: string,
    // 对话框内容
    content?: string | (() => JSX.Element),
    // 对话框宽度
    width?: string,
    // 确定回调
    onConfirm?: () => void,
    // 取消回调
    onCancel?: () => void
}