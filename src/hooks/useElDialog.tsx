import {ElDialogOptions} from '@/types/axios';
import {createVNode, defineComponent, reactive, render} from 'vue';
import {ElButton, ElDialog} from 'element-plus';
// 不是通过自动导入的，需要手动导入样式
import 'element-plus/theme-chalk/el-button.css';
import 'element-plus/theme-chalk/el-dialog.css';
import i18n from '@/lang';

const {t} = i18n.global;

export const useElDialog = () => {
    const openDialog = (options: ElDialogOptions) => {
        // 对话框状态
        const state = reactive({
            visible: true,
        });

        // 对话框组件
        const DialogComponent = defineComponent({
            setup(props, ctx) {
                const handleClose = () => {
                    state.visible = false;
                    destroy();
                };

                const handleConfirm = () => {
                    options.onConfirm?.();
                    handleClose();
                };

                const handleCancel = () => {
                    options.onCancel?.();
                    handleClose();
                };

                return () => (
                    <ElDialog
                        v-model={state.visible}
                        title={options.title || t('dialog.defaultTitle')}
                        width={options.width || '50%'}
                        onClose={handleClose}
                    >
                        {{
                            default: () => typeof options.content === 'function' ? options.content() : options.content || t('dialog.defaultContent'),
                            footer: () => (
                                // "noImplicitAny": false, 在tsconfig.json中设置避免隐含any类型时报错
                                <div>
                                    <ElButton onClick={handleCancel}>{t('cancel')}</ElButton>
                                    <ElButton type="primary" onClick={handleConfirm}>{t('confirm')}</ElButton>
                                </div>
                            ),
                        }}
                    </ElDialog>
                );
            },
        });

        const container = document.createElement('div');
        document.body.appendChild(container);

        const vNode = createVNode(DialogComponent);
        render(vNode, container);

        const destroy = () => {
            render(null, container);
            document.body.removeChild(container);
        };
    };

    return {
        openDialog,
    };
};