import {ElMessageOptions} from '@/types/axios';
import {ElMessage} from 'element-plus';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

/**
 * ElMessage默认配置
 */
const defaultOptions: ElMessageOptions = {
    message: t('api.defaultMessage'),
    type: 'info',
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
    ElMessage.success({
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

