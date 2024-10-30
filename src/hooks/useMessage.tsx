import {ElMessageOptions} from '../types/axios';
import {ElMessageTypeEnum} from '../enums/ElMessageTypeEnum';
import {ElMessage} from 'element-plus';

const createMessage = (options: ElMessageOptions, type: string) => {
    ElMessage({
        // TODO 存在问题，类型检查失败
    });
};

const createSuccessMessage = () => {

};

export function useMessage() {
    return {
        createSuccessMessage,
    };
}

