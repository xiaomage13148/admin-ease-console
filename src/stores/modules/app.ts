import {defineStore} from 'pinia';
import {useStorage} from '@vueuse/core';
import {LanguageEnum} from '@/enums/LanguageEnum';
import {computed} from 'vue';
// 导入 Element Plus 中英文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';

export const useAppStore = defineStore('app', () => {
    // 语言
    const language = useStorage('language', LanguageEnum.ZH_CN);

    // 对应的语言包
    const locale = computed(() => {
        if (language?.value === LanguageEnum.EN) {
            return en;
        } else {
            return zhCn;
        }
    });

    /**
     * 切换语言
     * @param val
     */
    function changeLanguage(val: string) {
        language.value = val;
    }

    return {
        language, locale, changeLanguage,
    };
});