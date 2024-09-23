import {defineStore} from 'pinia';
import {useStorage} from '@vueuse/core';
import {LanguageEnum} from '@/enums/LanguageEnum';
import {computed} from 'vue';

export const useAppStore = defineStore('app', () => {
    // 语言
    const language = useStorage('language', LanguageEnum.ZH_CN);

    // 对应的语言包
    const locale = computed(() => {
        if (language?.value === LanguageEnum.EN) {
            return LanguageEnum.EN;
        } else {
            return LanguageEnum.ZH_CN;
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