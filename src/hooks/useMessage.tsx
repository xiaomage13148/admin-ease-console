import {ElMessageOptions} from '../types/axios';
import {ElMessage} from 'element-plus';

const createSuccessMessage = (options: ElMessageOptions) => {
    ElMessage.success({
        ...options,
    });
};

const createWarnMessage = (options: ElMessageOptions) => {
    ElMessage.warning({
        ...options
    })
}


export function useMessage() {
    return {
        createSuccessMessage,
        createWarnMessage
    };
}

