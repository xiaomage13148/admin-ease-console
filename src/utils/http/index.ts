import {AxiosTransform} from '@/utils/http/axiosTransform';
import {AxiosResponse} from 'axios';
import {RequestOptions, Result} from '@/types/axios';
import {ResultEnum} from '@/enums/HttpEnum';
import {isEmpty, isNull, isUndefined} from '@/utils/common/is';
import {useElMessage} from '@/hooks/useElMessage';

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


};