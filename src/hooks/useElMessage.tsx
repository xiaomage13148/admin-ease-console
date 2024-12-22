import {ElMessageOptions} from '@/types/axios';
import i18n from '@/lang';

const {t} = i18n.global;

/**
 * ElMessage默认配置
 */
const defaultOptions: ElMessageOptions = {
    message: t('api.defaultMessage'),
    type: 'success',
    plain: false,
    dangerouslyUseHTMLString: false,
    duration: 3000,
};

type DefaultMessageOptions = Pick<ElMessageOptions, 'message' | 'type'>

/**
 * 创建默认Message
 * @param options
 */
const createDefaultMessage = (options: DefaultMessageOptions) => {
    ElMessage({
        ...defaultOptions,
        ...options,
    });
};

/**
 * 创建Message
 * @param options
 */
const createMessage = (options: ElMessageOptions) => {
    ElMessage({
        ...options,
    });
};

export function useElMessage() {
    return {
        createDefaultMessage,
        createMessage,
    };
}

